import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import NewsletterBar from '../components/NewsletterBar';
import './Blog.css';

const ALL_POSTS = [
  { id:1, emoji:'🍜', bg:'#FFF3E0', cat:'Dinner', title:'Creamy Tuscan Butter Pasta (30-Minute Dinner)', excerpt:'Sun-dried tomatoes, spinach, and a silky one-pan butter sauce. This has become the most requested recipe on this blog — and for good reason.', date:'May 10, 2026', time:'30 min', servings:'4 servings' },
  { id:2, emoji:'🍛', bg:'#FDECD8', cat:'Dinner', title:'Golden Coconut Chicken Curry — Ready in 40 Minutes', excerpt:'A fragrant, warming curry with coconut milk and turmeric. Feeds the whole family and reheats beautifully the next day.', date:'Apr 28, 2026', time:'40 min', servings:'5 servings' },
  { id:3, emoji:'🥗', bg:'#E8F5E9', cat:'Salads', title:'Mango Avocado Summer Salad with Honey-Lime Dressing', excerpt:'Bright, refreshing, and ready in 15 minutes. The honey-lime dressing makes everything sing.', date:'Apr 15, 2026', time:'15 min', servings:'2 servings' },
  { id:4, emoji:'🎂', bg:'#FCE4EC', cat:'Desserts', title:'Strawberry Ricotta Cake — Light, Moist & Not Too Sweet', excerpt:"Perfect for afternoon tea or a birthday treat that doesn't require frosting skills. My most-made dessert of 2025.", date:'Apr 2, 2026', time:'55 min', servings:'8 servings' },
  { id:5, emoji:'🍞', bg:'#FFF8DC', cat:'Baking', title:'Honey Oat Sandwich Bread — Perfect for Beginners', excerpt:'Soft, slightly sweet, and great for sandwiches. This beginner loaf will make your kitchen smell like a bakery.', date:'Mar 18, 2026', time:'2 hrs', servings:'1 loaf' },
  { id:6, emoji:'🥞', bg:'#FFF3E0', cat:'Breakfast', title:'Fluffy Buttermilk Pancakes That Actually Rise', excerpt:'Light, airy pancakes with golden edges. The secret is letting the batter rest for 5 minutes before cooking.', date:'Mar 5, 2026', time:'20 min', servings:'4 servings' },
  { id:7, emoji:'🫕', bg:'#F3E5F5', cat:'Dinner', title:'Slow-Cooked Lamb Stew with Root Vegetables', excerpt:'Fall-apart tender lamb with root vegetables and herbs. Best made on a lazy Sunday afternoon.', date:'Feb 20, 2026', time:'3 hrs', servings:'6 servings' },
  { id:8, emoji:'🍵', bg:'#E3F2FD', cat:'Breakfast', title:'Chai Spiced Overnight Oats', excerpt:'Spiced with cardamom, cinnamon, and ginger. Prep in 5 minutes the night before for a nourishing morning.', date:'Feb 8, 2026', time:'5 min + overnight', servings:'1 serving' },
  { id:9, emoji:'🥙', bg:'#E8F5E9', cat:'Vegetarian', title:'Roasted Veggie Wraps with Hummus', excerpt:'Caramelized zucchini, red pepper, and hummus wrapped in a warm tortilla. Meal prep friendly and endlessly customizable.', date:'Jan 25, 2026', time:'30 min', servings:'3 servings' },
];

const CATS = ['All', 'Breakfast', 'Dinner', 'Desserts', 'Salads', 'Baking', 'Vegetarian'];

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = ALL_POSTS.filter(p => {
    const matchesCat = activeCat === 'All' || p.cat === activeCat;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
        {/* MAIN CONTENT */}
        <main className="blog-main">
          {/* Category filter pills */}
          <div className="cat-filter">
            {CATS.map(c => (
              <button
                key={c}
                className={`cat-pill${activeCat === c ? ' active' : ''}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Ad slot */}
          <div className="ad-slot">Advertisement — AdSense ad appears here after approval</div>

          {/* Posts list */}
          <div className="post-list">
            {filtered.length === 0 && (
              <p style={{ color: 'var(--text-mid)', padding: '2rem 0' }}>No recipes found. Try a different category or search.</p>
            )}
            {filtered.map(post => (
              <article key={post.id} className="post-row">
                <div className="post-row__thumb" style={{ background: post.bg }}>
                  <span>{post.emoji}</span>
                </div>
                <div className="post-row__body">
                  <div className="post-row__meta">{post.date} · {post.cat} · {post.time}</div>
                  <h2 className="post-row__title">{post.title}</h2>
                  <p className="post-row__excerpt">{post.excerpt}</p>
                  <span className="post-row__readmore">Read More »</span>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className="blog-sidebar">
          {/* Search */}
          <div className="widget">
            <div className="widget__title">Search Recipes</div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button>🔍</button>
            </div>
          </div>

          {/* Categories */}
          <div className="widget">
            <div className="widget__title">Categories</div>
            <ul className="sidebar-cats">
              {[['Breakfast',32],['Dinner',45],['Salads & Bowls',18],['Soups & Stews',15],['Desserts',27],['Baking',21],['Vegetarian',30],['Kitchen Tips',12]].map(([cat, count]) => (
                <li key={cat}>
                  <span>{cat}</span>
                  <span className="sidebar-cat-count">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="widget widget--about">
            <div className="widget__title">About Adarsh</div>
            <div className="widget-about-inner">
              <div className="widget-avatar">👩‍🍳</div>
              <p>Home cook from Kathmandu sharing easy, soul-warming recipes tested in my real kitchen.</p>
              <Link to="/about">Read My Story →</Link>
            </div>
          </div>

          {/* Email opt-in */}
          <div className="widget widget--optin">
            <div className="widget__title">Free Recipe Guide</div>
            <p>Get my 25 easiest recipes as a free PDF when you subscribe.</p>
            <input type="email" placeholder="Your email" />
            <button>Get Free Guide!</button>
          </div>

          {/* Ad slot */}
          <div className="ad-slot" style={{ maxWidth: '100%' }}>Ad · 300×250</div>
        </aside>
      </div>

      <NewsletterBar />
    </>
  );
}
