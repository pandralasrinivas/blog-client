import React from 'react';

function BlogCard({ title, content, imageUrl, link }) {
  return (
    <div className="card-container">
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-header">{title}</div>
      <div className="card-content">{content}</div>
      <div className="card-footer">
        <a href={link} className="link">Read More</a>
        <button className="button">Like</button>
      </div>
    </div>
  );
}

export default BlogCard;
