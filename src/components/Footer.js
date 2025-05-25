import React from 'react';
import './Footer.css'; // 

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 My Blog. All rights reserved.</p>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" ><img className='social-media-img' src='https://img.icons8.com/?size=100&id=118497&format=png&color=000000' alt='fb'/></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img className='social-media-img' src='https://img.icons8.com/?size=100&id=32323&format=png&color=000000' alt='insta'/></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
