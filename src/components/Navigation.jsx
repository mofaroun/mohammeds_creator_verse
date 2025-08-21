import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '1.8rem', fontWeight: '800' }}>🎨 Creator Verse</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/show-creators">👥 All Creators</Link></li>
        <li><Link to="/add-creator">➕ Add Creator</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
