import React, { useState, useEffect } from 'react';
import { fetchPosts } from './api'; // Import the API function
import BlogCard from './BlogCard';
import './CardStyle.css';

function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then(response => setPosts(response.data.posts))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h2 style={{color:"#ff416c"}}>Blog Posts</h2>
      <div className="blog-list">
        {posts.map(post => (
          <BlogCard
            key={post.id}
            title={post.title}
            content={post.content.substring(0, 100)} 
            imageUrl={post.image_url} 
            link={`/posts/${post.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
