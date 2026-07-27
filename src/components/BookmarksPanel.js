"use client";
import { useEffect, useState } from 'react';
import { ARTICLES } from '@/data/articles';

function getBookmarks(){
  try{ const raw = localStorage.getItem('dmtenx_bookmarks'); return raw ? JSON.parse(raw) : []; }catch(e){ return []; }
}

export default function BookmarksPanel(){
  const [list, setList] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    setList(getBookmarks());
  },[]);

  function remove(id){
    const next = list.filter(x=>x!==id);
    localStorage.setItem('dmtenx_bookmarks', JSON.stringify(next));
    setList(next);
  }

  function exportBookmarks(){
    const payload = JSON.stringify(list, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bookmarks.json'; a.click();
    URL.revokeObjectURL(url);
  }

  function importBookmarks(e){
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try{
        const parsed = JSON.parse(reader.result);
        if(Array.isArray(parsed)){
          const merged = Array.from(new Set([...(getBookmarks()), ...parsed]));
          localStorage.setItem('dmtenx_bookmarks', JSON.stringify(merged));
          setList(merged);
          setMessage('Imported');
        } else setMessage('Invalid file');
      }catch(err){ setMessage('Invalid JSON'); }
    };
    reader.readAsText(f);
  }

  async function syncToServer(){
    try{
      const res = await fetch('/api/bookmarks', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ bookmarks: list }) });
      const j = await res.json();
      setMessage(j.ok ? 'Synced' : 'Sync failed');
    }catch(err){ setMessage('Sync error'); }
  }

  return (
    <div className="bookmarks-panel">
      <h4>Saved</h4>
      {list.length === 0 && <div className="muted">No bookmarks yet.</div>}
      <ul>
        {list.map(id=>{
          const a = ARTICLES.find(x=>x.id===id) || { id, title: 'Unknown' };
          return (
            <li key={id}>
              <a href={`/blog/${a.slug}`}>{a.title}</a>
              <button className="small" onClick={()=>remove(id)}>Remove</button>
            </li>
          );
        })}
      </ul>

      <div style={{display:'flex',gap:8,marginTop:8}}>
        <button onClick={exportBookmarks}>Export</button>
        <label className="import-label">
          Import
          <input type="file" accept="application/json" onChange={importBookmarks} style={{display:'none'}} />
        </label>
        <button onClick={syncToServer}>Sync</button>
      </div>
      {message && <div className="muted" style={{marginTop:8}}>{message}</div>}
    </div>
  );
}
