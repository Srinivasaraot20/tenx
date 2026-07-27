import { NextResponse } from 'next/server';

let EVENTS = [];

export async function POST(req){
  try{
    const body = await req.json();
    const entry = { id: Date.now(), ...body, ts: new Date().toISOString() };
    EVENTS.push(entry);
    // In production: forward to analytics provider (GA4 Measurement Protocol, Segment, etc.)
    return NextResponse.json({ ok:true, id: entry.id });
  }catch(err){
    return NextResponse.json({ ok:false, error: String(err) }, { status: 500 });
  }
}

export async function GET(){
  return NextResponse.json({ ok:true, events: EVENTS.slice(-100) });
}
