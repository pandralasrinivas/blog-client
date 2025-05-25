import React, { useState } from 'react';
import { createPost } from './api'; // Adjust the import path as necessary
import './BlogForm.css'; // Import your CSS file for styling
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function BlogForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const email = Cookie.get('email');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    const newPost = {
      email,
      title,
      content,
      image_url: imageUrl
    };

    createPost(newPost)
      .then(response => {
        onPostCreated();
        setTitle('');
        setContent('');
        setImageUrl('');
      })
      .catch(error => console.error('Error creating post:', error));
  };

  return (
    <>
    <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
    <form onSubmit={handleSubmit} className='form-container'>
      <div>
        <h2>Create Blog</h2>
        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder='Image URL'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
    </>
  );
}

export default BlogForm;
