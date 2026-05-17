import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const blogCategories = [
  { label: 'All Recipes', path: '/blog' },
  { label: 'Breakfast', path: '/blog?cat=breakfast' },
  { label: 'Dinner', path: '/blog?cat=dinner' },
  { label: 'Desserts', path: '/blog?cat=desserts' },
  { label: 'Vegetarian', path: '/blog?cat=vegetarian' },
  { label: 'Kitchen Tips', path: '/blog?cat=tips' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          Spoon <strong>&</strong> Soul
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>

          <li
            className="navbar__dropdown-parent"
            onMouseEnter={() => setBlogOpen(true)}
            onMouseLeave={() => setBlogOpen(false)}
          >
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>
              Blog ▾
            </NavLink>
            {blogOpen && (
              <div className="navbar__dropdown">
                {blogCategories.map(c => (
                  <Link key={c.label} to={c.path}>{c.label}</Link>
                ))}
              </div>
            )}
          </li>

          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          <li><NavLink to="/privacy-policy" className="navbar__cta">Privacy Policy</NavLink></li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`navbar__burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>All Recipes</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/privacy-policy" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>
        </div>
      )}
    </nav>
  );
}
