import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__col">
          <h4>Spoon & Soul</h4>
          <p>A home cooking blog with heart. Simple, tested, soul-warming recipes from my kitchen in Kathmandu to yours.</p>
        </div>
        <div className="footer__col">
          <h4>Recipes</h4>
          <ul>
            <li><Link to="/blog">Breakfast</Link></li>
            <li><Link to="/blog">Dinner</Link></li>
            <li><Link to="/blog">Desserts</Link></li>
            <li><Link to="/blog">Salads & Bowls</Link></li>
            <li><Link to="/blog">Vegetarian</Link></li>
            <li><Link to="/blog">Baking</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Learn</h4>
          <ul>
            <li><Link to="/blog">Kitchen Tips</Link></li>
            <li><Link to="/blog">Meal Planning</Link></li>
            <li><Link to="/about">About Maya</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Info</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom container">
        <span>© {year} Spoon & Soul · All Rights Reserved</span>
        <span>
          <Link to="/privacy-policy">Privacy Policy</Link>
          {' · '}
          <Link to="/contact">Contact</Link>
        </span>
      </div>
    </footer>
  );
}
