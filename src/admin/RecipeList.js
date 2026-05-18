import React, { useState, useEffect, useCallback } from 'react';
import './RecipeList.css';

const token = () => localStorage.getItem('admin_token');
const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` });

export default function RecipeList({ onEdit, onNew }) {
  const [recipes, setRecipes]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');
  const [deleteId, setDeleteId] = useState(null);
  const [msg, setMsg]           = useState('');

  const load = useCallback(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/admin/recipes', { headers: headers() })
      .then(r => r.json())
      .then(data => { setRecipes(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = recipes.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'published' && r.published) || (filter === 'draft' && !r.published);
    return matchSearch && matchFilter;
  });

  const handleToggle = async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/recipes/${id}/publish`, { method: 'PATCH', headers: headers() });
    const data = await res.json();
    setRecipes(prev => prev.map(r => r.id === id ? data : r));
    setMsg(data.published ? '✅ Published!' : '📋 Moved to draft.');
    setTimeout(() => setMsg(''), 2500);
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/admin/recipes/${deleteId}`, { method: 'DELETE', headers: headers() });
    setRecipes(prev => prev.filter(r => r.id !== deleteId));
    setDeleteId(null);
    setMsg('🗑️ Recipe deleted.');
    setTimeout(() => setMsg(''), 2500);
  };

  const published = recipes.filter(r => r.published).length;
  const drafts    = recipes.filter(r => !r.published).length;

  return (
    <div className="recipe-list">
      <div className="rl-header">
        <div>
          <h1>All Recipes</h1>
          <p>{published} published · {drafts} drafts · {recipes.length} total</p>
        </div>
        <button className="rl-new-btn" onClick={onNew}>+ New Recipe</button>
      </div>

      {msg && <div className="rl-msg">{msg}</div>}

      {/* AdSense Progress */}
      {published < 10 && (
        <div className="rl-adsense-bar">
          <div className="rl-adsense-bar__text">
            <span>📊 AdSense Progress</span>
            <span><strong>{published}</strong> / 10 published recipes needed</span>
          </div>
          <div className="rl-progress-track">
            <div className="rl-progress-fill" style={{ width: `${Math.min((published/10)*100, 100)}%` }} />
          </div>
        </div>
      )}

      {/* FILTERS */}
      <div className="rl-filters">
        <div className="rl-search">
          <span>🔍</span>
          <input type="text" placeholder="Search recipes..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="rl-filter-pills">
          {['all','published','draft'].map(f => (
            <button key={f} className={`rl-pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="rl-loading">Loading recipes...</div>
      ) : filtered.length === 0 ? (
        <div className="rl-empty">
          <p>{search ? 'No recipes match your search.' : 'No recipes yet.'}</p>
          {!search && <button onClick={onNew}>Create your first recipe →</button>}
        </div>
      ) : (
        <div className="rl-table-wrap">
          <table className="rl-table">
            <thead>
              <tr>
                <th style={{width:40}}></th>
                <th>Title</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{textAlign:'right'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td style={{fontSize:'1.4rem', textAlign:'center'}}>{r.emoji}</td>
                  <td>
                    <div className="rl-title">{r.title}</div>
                    <div className="rl-excerpt">{r.excerpt}</div>
                  </td>
                  <td><span className="rl-cat">{r.category}</span></td>
                  <td><span className="rl-diff">{r.difficulty}</span></td>
                  <td>
                    <button
                      className={`rl-status ${r.published ? 'published' : 'draft'}`}
                      onClick={() => handleToggle(r.id)}
                      title={r.published ? 'Click to unpublish' : 'Click to publish'}
                    >
                      {r.published ? '✅ Published' : '📋 Draft'}
                    </button>
                  </td>
                  <td style={{fontSize:'0.8rem', color:'#aaa'}}>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="rl-actions">
                      <button className="rl-edit-btn" onClick={() => onEdit(r.id)}>Edit</button>
                      <button className="rl-delete-btn" onClick={() => setDeleteId(r.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="rl-modal-overlay">
          <div className="rl-modal">
            <div style={{fontSize:'2.5rem', marginBottom:'0.8rem'}}>🗑️</div>
            <h3>Delete this recipe?</h3>
            <p>This action cannot be undone. The recipe will be permanently removed.</p>
            <div className="rl-modal-actions">
              <button className="rl-modal-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="rl-modal-confirm" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
