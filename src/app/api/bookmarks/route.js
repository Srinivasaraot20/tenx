import { NextResponse } from 'next/server';

let SERVER_BOOKMARKS = [];

export async function POST(req){
  try{
    const body = await req.json();
    if(Array.isArray(body.bookmarks)){
      SERVER_BOOKMARKS = Array.from(new Set([...SERVER_BOOKMARKS, ...body.bookmarks]));
      return NextResponse.json({ ok:true, count: SERVER_BOOKMARKS.length });
    }
    return NextResponse.json({ ok:false, error: 'invalid' }, { status: 400 });
  }catch(err){
    return NextResponse.json({ ok:false, error: String(err) }, { status: 500 });
  }
}

export async function GET(){
  return NextResponse.json({ ok:true, bookmarks: SERVER_BOOKMARKS });
}

