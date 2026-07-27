import { NextResponse } from 'next/server';

// Server-side subscribe endpoint supporting Mailchimp or ConvertKit.
// Environment variables (set in production):
// MAIL_PROVIDER = 'mailchimp' | 'convertkit'
// MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER_PREFIX
// CONVERTKIT_API_KEY, CONVERTKIT_FORM_ID

let SUBSCRIBERS = []; // local cache for GET (still available for testing)

export async function POST(req){
  try{
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      return NextResponse.json({ ok:false, error: 'Invalid email' }, { status: 400 });
    }

    const provider = (process.env.MAIL_PROVIDER || '').toLowerCase();

    if(provider === 'mailchimp'){
      const apiKey = process.env.MAILCHIMP_API_KEY;
      const listId = process.env.MAILCHIMP_LIST_ID;
      const dc = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. us19
      if(!apiKey || !listId || !dc){
        return NextResponse.json({ ok:false, error: 'Mailchimp not configured' }, { status: 500 });
      }

      const url = `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`;
      const payload = { email_address: email, status: 'pending' };

      const auth = 'Basic ' + Buffer.from('anystring:' + apiKey).toString('base64');
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: auth }, body: JSON.stringify(payload) });
      const data = await res.json();
      if(res.status === 200 || res.status === 201){
        SUBSCRIBERS.push({ id: Date.now(), email, provider: 'mailchimp', createdAt: new Date().toISOString() });
        return NextResponse.json({ ok:true, provider: 'mailchimp', data });
      }
      return NextResponse.json({ ok:false, error: data }, { status: res.status });
    }

    if(provider === 'convertkit'){
      const apiKey = process.env.CONVERTKIT_API_KEY;
      const formId = process.env.CONVERTKIT_FORM_ID;
      if(!apiKey || !formId){
        return NextResponse.json({ ok:false, error: 'ConvertKit not configured' }, { status: 500 });
      }

      const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;
      const payload = { api_key: apiKey, email };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if(res.ok){
        SUBSCRIBERS.push({ id: Date.now(), email, provider: 'convertkit', createdAt: new Date().toISOString() });
        return NextResponse.json({ ok:true, provider: 'convertkit', data });
      }
      return NextResponse.json({ ok:false, error: data }, { status: res.status });
    }

    // Fallback: keep in in-memory list (useful for local dev)
    if(SUBSCRIBERS.find(s => s.email === email)){
      return NextResponse.json({ ok:true, message: 'Already subscribed (local)' });
    }
    const entry = { id: Date.now(), email, createdAt: new Date().toISOString() };
    SUBSCRIBERS.push(entry);
    return NextResponse.json({ ok:true, id: entry.id });
  } catch(err){
    return NextResponse.json({ ok:false, error: String(err) }, { status: 500 });
  }
}

export async function GET(){
  return NextResponse.json({ ok:true, subscribers: SUBSCRIBERS });
}
