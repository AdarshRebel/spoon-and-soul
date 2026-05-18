import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import recipes from '../data/recipes';
import NewsletterBar from '../components/NewsletterBar';
import './Blog.css';

const CATS = ['All', 'Breakfast', 'Dinner', 'Desserts', 'Salads', 'Baking', 'Vegetarian', 'Soups'];

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filtered = recipes.filter(p => {
    const matchesCat = activeCat === 'All' || p.cat === activeCat;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const goToRecipe = (slug) => {
    navigate(`/recipe/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title>All Recipes — Spoon & Soul</title>
        <meta name="description" content="Browse all easy, tested recipes from Spoon & Soul. From quick weeknight dinners to weekend baking." />
      </Helmet>

      <div className="page-header">
        <h1>All Recipes</h1>
        <p>Easy, tested, and made with love — find your next favourite meal</p>
      </div>

      <div className="blog-layout container">
        <main className="blog-main">
          <div className="cat-filter">
            {CATS.map(c => (
              <button key={c} className={`cat-pill${activeCat === c ? ' active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
            ))}
          </div>

          <div className="ad-slot">Advertisement — AdSense ad appears here after approval</div>

          <div className="post-list">
            {filtered.length === 0 && (
              <p style={{ color: 'var(--text-mid)', padding: '2rem 0' }}>No recipes found. Try a different category or search term.</p>
            )}
            {filtered.map(post => (
              <article key={post.id} className="post-row" onClick={() => goToRecipe(post.slug)}>
                <div className="post-row__thumb" style={{ background: post.bg }}>
                  <span>{post.emoji}</span>
                </div>
                <div className="post-row__body">
                  <div className="post-row__meta">{post.date} · {post.cat} · {post.time}</div>
                  <h2 className="post-row__title">{post.title}</h2>
                  <p className="post-row__excerpt">{post.excerpt}</p>
                  <span className="post-row__readmore">Read Full Recipe »</span>
                </div>
              </article>
            ))}
          </div>
        </main>

        <aside className="blog-sidebar">
          <div className="widget">
            <div className="widget__title">Search Recipes</div>
            <div className="search-box">
              <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <button>🔍</button>
            </div>
          </div>

          <div className="widget">
            <div className="widget__title">Categories</div>
            <ul className="sidebar-cats">
              {[['Breakfast',2],['Dinner',4],['Salads',1],['Soups',1],['Desserts',1],['Baking',1],['Vegetarian',1]].map(([cat, count]) => (
                <li key={cat}>
                  <span onClick={() => setActiveCat(cat)} style={{ cursor: 'pointer', color: 'var(--text-mid)' }}>{cat}</span>
                  <span className="sidebar-cat-count">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="widget widget--about">
            <div className="widget__title">About Maya</div>
            <div className="widget-about-inner">
              <div className="widget-avatar">👩‍🍳</div>
              <p>Home cook from Kathmandu sharing easy, soul-warming recipes tested in my real kitchen.</p>
              <Link to="/about">Read My Story →</Link>
            </div>
          </div>

          <div className="widget widget--optin">
            <div className="widget__title">Free Recipe Guide</div>
            <p>Get my 25 easiest recipes as a free PDF when you subscribe.</p>
            <input type="email" placeholder="Your email" />
            <button>Get Free Guide!</button>
          </div>

          <div className="ad-slot" style={{ maxWidth: '100%' }}>Ad · 300×250</div>
        </aside>
      </div>

      <NewsletterBar />
    </>
  );
}
