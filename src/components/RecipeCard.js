import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({ emoji, bg, tag, title, excerpt, date, time, servings }) {
  return (
    <article className="recipe-card">
      <div className="recipe-card__thumb" style={{ background: bg }}>
        <span className="recipe-card__emoji">{emoji}</span>
        <span className="recipe-card__tag-pill">{tag}</span>
      </div>
      <div className="recipe-card__body">
        <div className="recipe-card__meta">{date} &nbsp;·&nbsp; {time}</div>
        <h3 className="recipe-card__title">{title}</h3>
        <p className="recipe-card__excerpt">{excerpt}</p>
        <div className="recipe-card__footer">
          <span>⏱ {time}</span>
          <span>👤 {servings}</span>
          <span className="recipe-card__readmore">Read More »</span>
        </div>
      </div>
    </article>
  );
}
