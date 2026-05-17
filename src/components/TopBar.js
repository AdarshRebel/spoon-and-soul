import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css';

export default function TopBar() {
  return (
    <div className="topbar">
      🎉 New Recipe Every Week —{' '}
      <Link to="/blog">See Latest Posts</Link>
    </div>
  );
}
