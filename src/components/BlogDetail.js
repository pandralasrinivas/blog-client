import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from './api'; // Adjust the import path as necessary
import './BlogDetail.css';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(id)
      .then(response => setPost(response.data.post))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <h1 className="blog-title">{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt={post.title} className="blog-image" />}
      <p className="blog-content">{post.content}</p>
    </div>
  );
}

export default BlogDetail;
