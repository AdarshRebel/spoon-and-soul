import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import RecipeCard from '../components/RecipeCard';
import NewsletterBar from '../components/NewsletterBar';
import './Home.css';

const CATEGORIES = [
  { emoji: '🥞', label: 'Breakfast', count: 32, bg: '#FFF3E0' },
  { emoji: '🥗', label: 'Salads & Bowls', count: 18, bg: '#E8F5E9' },
  { emoji: '🍛', label: 'Dinner', count: 45, bg: '#FDECD8' },
  { emoji: '🎂', label: 'Desserts', count: 27, bg: '#FCE4EC' },
  { emoji: '🍲', label: 'Soups & Stews', count: 15, bg: '#E3F2FD' },
  { emoji: '🍞', label: 'Baking', count: 21, bg: '#F3E5F5' },
];

const POPULAR_POSTS = [
  {
    emoji: '🍜', bg: '#FFF3E0', tag: 'Dinner',
    title: 'Creamy Tuscan Butter Pasta (30-Minute Dinner)',
    excerpt: 'Sun-dried tomatoes, spinach, and a silky one-pan butter sauce. The most requested recipe on this blog.',
    date: 'May 10, 2026', time: '30 min', servings: '4 servings',
  },
  {
    emoji: '🍛', bg: '#FDECD8', tag: 'Dinner',
    title: 'Golden Coconut Chicken Curry — Ready in 40 Minutes',
    excerpt: 'A fragrant, warming curry with coconut milk and turmeric. Feeds the whole family and reheats beautifully.',
    date: 'Apr 28, 2026', time: '40 min', servings: '5 servings',
  },
  {
    emoji: '🥗', bg: '#E8F5E9', tag: 'Salads',
    title: 'Mango Avocado Summer Salad with Honey-Lime Dressing',
    excerpt: 'Bright, refreshing, ready in 15 minutes. The dressing alone is reason enough to make this all summer.',
    date: 'Apr 15, 2026', time: '15 min', servings: '2 servings',
  },
];

const YT_VIDEOS = [
  { icon: '▶', title: 'How I make the creamiest pasta without cream', views: '12K views' },
  { icon: '▶', title: '5 easy dinners I cook every week as a busy person', views: '8.4K views' },
  { icon: '▶', title: 'My first sourdough bread attempt — what I learned', views: '6.1K views' },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [optedIn, setOptedIn] = useState(false);

  const handleOptIn = (e) => {
    e.preventDefault();
    if (email) setOptedIn(true);
  };

  return (
    <>
      <Helmet>
        <title>Spoon & Soul — Recipes Made with Love</title>
        <meta name="description" content="Easy, soul-warming recipes for home cooks. From quick weeknight dinners to weekend baking — find your next favourite meal." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__eyebrow">Free Recipe Ebook Inside</div>
          <h1>Get My <em>Top 25 Easy Recipes</em> Delivered Straight to Your Inbox</h1>
          <p>Join 9,000+ home cooks getting a fresh recipe every Tuesday — plus instant access to my free beginner's recipe guide.</p>
          <div className="opt-in-box">
            <h3>Yes! Send Me the Free Recipes</h3>
            <p>Enter your details below to get instant access:</p>
            <ul className="checklist">
              <li>25 beginner-friendly recipes (free PDF)</li>
              <li>Weekly new recipes straight to your inbox</li>
              <li>Exclusive tips not published on the blog</li>
            </ul>
            {optedIn ? (
              <div className="opt-in-success">
                🎉 You're in ! Check your inbox for your free guide.
              </div>
            ) : (
              <form className="opt-form" onSubmit={handleOptIn}>
                <input type="text" placeholder="First Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit">Get Instant Access Now!</button>
                <p className="opt-disclaimer">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── AS SEEN ON ── */}
      <div className="featured-bar">
        <p>Spoon & Soul has been featured on:</p>
        <div className="press-logos">
          {['Food52', 'Tasty', 'The Kitchn', 'Bon Appétit', 'Serious Eats'].map(name => (
            <span key={name} className="press-logo">{name}</span>
          ))}
        </div>
      </div>

      {/* ── PERSONAL INTRO ── */}
      <div className="intro-strip">
        <div className="intro-inner container">
          <div className="intro-avatar">👩‍🍳</div>
          <div className="intro-text">
            <h2>Hi, I'm Adarsh — welcome to my kitchen!</h2>
            <p>
              I'm a home cook from Kathmandu who started this blog to save my favourite recipes and accidentally built a community of thousands. Every recipe here is tested in my real kitchen, with real ingredients, and eaten at my actual dinner table. No fancy equipment needed.{' '}
              <Link to="/about">Read my full story →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <div className="section container">
        <div className="section-heading">
          <h2>What Would You Like to Cook Today?</h2>
          <p>Browse recipes by category</p>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map(cat => (
            <Link to="/blog" key={cat.label} className="cat-block" style={{ background: cat.bg }}>
              <div className="cat-emoji">{cat.emoji}</div>
              <div className="cat-overlay" />
              <div className="cat-label">
                <strong>{cat.label}</strong>
                <span>{cat.count} recipes</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── AD SLOT ── */}
      <div className="container">
        <div className="ad-slot">Advertisement — Google AdSense Ad will appear here after approval</div>
      </div>

      {/* ── POPULAR POSTS ── */}
      <div className="section container">
        <div className="section-heading">
          <h2>Popular Recipes</h2>
          <p>The most-loved recipes from this kitchen</p>
        </div>
        <div className="posts-grid">
          {POPULAR_POSTS.map(post => (
            <RecipeCard key={post.title} {...post} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/blog" className="btn-outline">View All Recipes →</Link>
        </div>
      </div>

      {/* ── YOUTUBE STRIP ── */}
      <div className="yt-strip">
        <div className="yt-inner">
          <h2>Free Cooking Tutorials on YouTube</h2>
          <p>Watch step-by-step recipe videos from my kitchen — new video every week. Subscribe so you never miss one.</p>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="yt-subscribe-btn"
          >
            ▶ Subscribe on YouTube
          </a>
          <div className="yt-thumbs">
            {YT_VIDEOS.map(v => (
              <div key={v.title} className="yt-thumb">
                <div className="yt-thumb-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <span>{v.views}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEWSLETTER ── */}
      <NewsletterBar />
    </>
  );
}
