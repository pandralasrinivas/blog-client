import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import './Dashboard.css';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = Cookie.get('token');
      const res = await axios.get('http://localhost:5000/my-posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(res.data.posts);
    } catch (err) {
      setError('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = Cookie.get('token');
        await axios.delete(
          `http://localhost:5000/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch {
        alert('Delete failed.');
      }
    }
  };

  return (
    <div className="dashboard">
      <h1>My Blog Dashboard</h1>
      <button
        className="add-blog-btn"
        onClick={() => navigate('/new-post')}
        style={{ marginBottom: '20px' }}
      >
        + Add Blog Post
      </button>
      {loading && <p>Loading blogs...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && blogs.length === 0 && <p>No blogs found.</p>}
      <div className="blog-grid">
        {blogs.map(blog => (
          <div className="blog-card" key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.excerpt || blog.content?.slice(0, 100) + '...'}</p>
            <div className="card-actions">
              <button onClick={() => window.location.href = `/posts/${blog.id}`}>View</button>
              <button onClick={() => window.location.href = `/edit/${blog.id}`} className="edit">Edit</button>
              <button onClick={() => handleDelete(blog.id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
