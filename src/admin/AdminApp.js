import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import './AdminApp.css';

export default function AdminApp() {
  const [user, setUser]     = useState(null);
  const [page, setPage]     = useState('dashboard'); // dashboard | recipes | new | edit
  const [editId, setEditId] = useState(null);
  const [checking, setChecking] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { setChecking(false); return; }
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setUser(data); setChecking(false); })
      .catch(() => setChecking(false));
  }, []);

  const handleLogin  = (u) => setUser(u);
  const handleLogout = () => { localStorage.removeItem('admin_token'); setUser(null); };

  const navigate = (p, id) => {
    setPage(p);
    setEditId(id || null);
  };

  if (checking) return <div className="admin-splash">Loading...</div>;
  if (!user) return <AdminLogin onLogin={handleLogin} />;

  const renderPage = () => {
    if (page === 'dashboard') return <Dashboard user={user} onNavigate={navigate} />;
    if (page === 'recipes')   return <RecipeList onEdit={(id) => navigate('edit', id)} onNew={() => navigate('new')} />;
    if (page === 'new')       return <RecipeForm onSaved={() => navigate('recipes')} onCancel={() => navigate('recipes')} />;
    if (page === 'edit')      return <RecipeForm editId={editId} onSaved={() => navigate('recipes')} onCancel={() => navigate('recipes')} />;
    return null;
  };

  const navItems = [
    { key: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { key: 'recipes',   icon: '📝', label: 'All Recipes' },
    { key: 'new',       icon: '➕', label: 'New Recipe' },
  ];

  return (
    <div className="admin-shell">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand__logo">🍜</span>
          <div>
            <div className="admin-brand__name">Spoon & Soul</div>
            <div className="admin-brand__sub">Admin Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`admin-nav__item${page === item.key ? ' active' : ''}`}
              onClick={() => navigate(item.key)}
            >
              <span className="admin-nav__icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav__item">
            <span className="admin-nav__icon">🌐</span>
            <span>View Website</span>
          </a>
          <div className="admin-user">
            <div className="admin-user__avatar">{user.username[0].toUpperCase()}</div>
            <div className="admin-user__info">
              <strong>{user.username}</strong>
              <span>{user.email}</span>
            </div>
            <button className="admin-logout" onClick={handleLogout} title="Logout">⏻</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div className="admin-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
