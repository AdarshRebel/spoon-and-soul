import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getRecipeBySlug, RECIPES } from '../data/recipes';
import './RecipeDetail.css';

export default function RecipeDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return (
      <div className="not-found">
        <h2>Recipe not found</h2>
        <Link to="/blog">← Back to all recipes</Link>
      </div>
    );
  }

  const related = RECIPES.filter(r => r.cat === recipe.cat && r.id !== recipe.id).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{recipe.title} — Spoon & Soul</title>
        <meta name="description" content={recipe.excerpt} />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://dailytrend.me/recipe/${recipe.slug}`} />
      </Helmet>

      {/* BREADCRUMB */}
      <div className="breadcrumb-bar">
        <div className="container">
          <Link to="/">Home</Link> › <Link to="/blog">Recipes</Link> › {recipe.cat} › <span>{recipe.title}</span>
        </div>
      </div>

      <div className="recipe-detail container">

        {/* HERO */}
        <div className="rd-hero">
          <div className="rd-hero__thumb" style={{ background: recipe.bg }}>
            <span>{recipe.emoji}</span>
          </div>
          <div className="rd-hero__info">
            <span className="rd-cat-badge">{recipe.cat}</span>
            <h1>{recipe.title}</h1>
            <p className="rd-excerpt">{recipe.excerpt}</p>
            <div className="rd-meta-grid">
              <div className="rd-meta-item">
                <span className="rd-meta-icon">⏱</span>
                <span className="rd-meta-label">Total Time</span>
                <span className="rd-meta-value">{recipe.time}</span>
              </div>
              <div className="rd-meta-item">
                <span className="rd-meta-icon">🔪</span>
                <span className="rd-meta-label">Prep</span>
                <span className="rd-meta-value">{recipe.prepTime}</span>
              </div>
              <div className="rd-meta-item">
                <span className="rd-meta-icon">🔥</span>
                <span className="rd-meta-label">Cook</span>
                <span className="rd-meta-value">{recipe.cookTime}</span>
              </div>
              <div className="rd-meta-item">
                <span className="rd-meta-icon">👤</span>
                <span className="rd-meta-label">Serves</span>
                <span className="rd-meta-value">{recipe.servings}</span>
              </div>
              <div className="rd-meta-item">
                <span className="rd-meta-icon">📊</span>
                <span className="rd-meta-label">Difficulty</span>
                <span className="rd-meta-value">{recipe.difficulty}</span>
              </div>
              <div className="rd-meta-item">
                <span className="rd-meta-icon">👩‍🍳</span>
                <span className="rd-meta-label">Author</span>
                <span className="rd-meta-value">{recipe.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AD SLOT */}
        <div className="ad-slot">Advertisement — Google AdSense ad will appear here after approval</div>

        {/* MAIN LAYOUT */}
        <div className="rd-layout">
          <article className="rd-main">

            {/* INTRO */}
            <section className="rd-section">
              <div className="rd-intro">
                {recipe.intro.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* INGREDIENTS */}
            <section className="rd-section">
              <h2 className="rd-section-title">
                <span>🥘</span> Ingredients
              </h2>
              <div className="rd-ingredients-box">
                <ul className="rd-ingredients-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i}>
                      <span className="rd-check">☐</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* INSTRUCTIONS */}
            <section className="rd-section">
              <h2 className="rd-section-title">
                <span>📋</span> Instructions
              </h2>
              <ol className="rd-steps">
                {recipe.instructions.map((inst) => (
                  <li key={inst.step} className="rd-step">
                    <div className="rd-step-num">{inst.step}</div>
                    <div className="rd-step-content">
                      <h3>{inst.title}</h3>
                      <p>{inst.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* TIPS */}
            <section className="rd-section">
              <h2 className="rd-section-title">
                <span>💡</span> Maya's Tips
              </h2>
              <div className="rd-tips-box">
                <ul className="rd-tips-list">
                  {recipe.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* CONCLUSION */}
            <section className="rd-section">
              <div className="rd-conclusion">
                {recipe.conclusion.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* AUTHOR BIO */}
            <div className="rd-author-box">
              <div className="rd-author-avatar">👩‍🍳</div>
              <div>
                <h4>About Maya Tamang</h4>
                <p>
                  Home cook from Kathmandu sharing easy, tested recipes made in my real kitchen.
                  Every recipe on this site has been made multiple times before being published.{' '}
                  <Link to="/about">Read my full story →</Link>
                </p>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="rd-sidebar">
            {/* Jump to section */}
            <div className="widget">
              <div className="widget__title">Jump To</div>
              <ul className="rd-jump-links">
                <li><a href="#ingredients">🥘 Ingredients</a></li>
                <li><a href="#instructions">📋 Instructions</a></li>
                <li><a href="#tips">💡 Tips</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="widget widget--optin">
              <div className="widget__title">Get Free Recipes</div>
              <p>New recipe every Tuesday — straight to your inbox.</p>
              <input type="email" placeholder="Your email" />
              <button>Subscribe Free</button>
            </div>

            {/* Ad slot */}
            <div className="ad-slot" style={{ maxWidth: '100%' }}>Ad · 300×250</div>
          </aside>
        </div>

        {/* RELATED RECIPES */}
        {related.length > 0 && (
          <section className="rd-related">
            <h2>More {recipe.cat} Recipes</h2>
            <div className="rd-related-grid">
              {related.map(r => (
                <div
                  key={r.id}
                  className="rd-related-card"
                  onClick={() => { navigate(`/recipe/${r.slug}`); window.scrollTo(0,0); }}
                >
                  <div className="rd-related-thumb" style={{ background: r.bg }}>{r.emoji}</div>
                  <div className="rd-related-body">
                    <span className="rd-related-cat">{r.cat}</span>
                    <h4>{r.title}</h4>
                    <span className="post-row__readmore">Read More »</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
