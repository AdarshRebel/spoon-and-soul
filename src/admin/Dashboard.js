import React, { useEffect, useState } from 'react';
import './Dashboard.css';

export default function Dashboard({ user, onNavigate }) {
  const [stats, setStats] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const h = { Authorization: `Bearer ${token}` };

    fetch('http://localhost:5000/api/admin/stats', { headers: h })
      .then(r => r.json()).then(setStats);

    fetch('http://localhost:5000/api/admin/recipes', { headers: h })
      .then(r => r.json()).then(data => setRecipes(Array.isArray(data) ? data.slice(0, 5) : []));
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <div>
          <h1>Welcome back, {user?.username}! 👋</h1>
          <p>Here's what's happening on your blog today.</p>
        </div>
        <button className="btn-new-recipe" onClick={() => onNavigate('new')}>
          + New Recipe
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="stat-cards">
        <div className="stat-card stat-card--orange">
          <div className="stat-card__icon">📝</div>
          <div className="stat-card__num">{stats?.total ?? '—'}</div>
          <div className="stat-card__label">Total Recipes</div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-card__icon">✅</div>
          <div className="stat-card__num">{stats?.published ?? '—'}</div>
          <div className="stat-card__label">Published</div>
        </div>
        <div className="stat-card stat-card--yellow">
          <div className="stat-card__icon">📋</div>
          <div className="stat-card__num">{stats?.drafts ?? '—'}</div>
          <div className="stat-card__label">Drafts</div>
        </div>
        <div className="stat-card stat-card--blue">
          <div className="stat-card__icon">🗂️</div>
          <div className="stat-card__num">{stats?.categories ?? '—'}</div>
          <div className="stat-card__label">Categories</div>
        </div>
      </div>

      {/* ADSENSE CHECKLIST */}
      <div className="adsense-checklist">
        <h2>📊 AdSense Readiness Checklist</h2>
        <div className="checklist-grid">
          {[
            { label: 'About page', done: true },
            { label: 'Contact page', done: true },
            { label: 'Privacy Policy page', done: true },
            { label: 'Sitemap submitted to Google', done: true },
            { label: 'robots.txt configured', done: true },
            { label: '10+ published recipes', done: (stats?.published || 0) >= 10 },
            { label: '2–3 weeks of content', done: false },
          ].map((item, i) => (
            <div key={i} className={`checklist-item ${item.done ? 'done' : 'pending'}`}>
              <span>{item.done ? '✅' : '⏳'}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {(stats?.published || 0) < 10 && (
          <p className="adsense-tip">
            ⚠️ You need <strong>{10 - (stats?.published || 0)} more published recipes</strong> before applying for AdSense.
          </p>
        )}
      </div>

      {/* RECENT RECIPES */}
      <div className="recent-recipes">
        <div className="recent-recipes__header">
          <h2>Recent Recipes</h2>
          <button onClick={() => onNavigate('recipes')}>View All →</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Recipe</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: '#aaa', padding: '2rem' }}>No recipes yet. <button onClick={() => onNavigate('new')} style={{ color: '#E8622A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Create your first one →</button></td></tr>
            )}
            {recipes.map(r => (
              <tr key={r.id}>
                <td><span style={{ fontSize: '1.1rem', marginRight: 8 }}>{r.emoji}</span>{r.title}</td>
                <td><span className="cat-badge">{r.category}</span></td>
                <td><span className={`status-badge ${r.published ? 'published' : 'draft'}`}>{r.published ? 'Published' : 'Draft'}</span></td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td><button className="edit-btn" onClick={() => onNavigate('edit', r.id)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
