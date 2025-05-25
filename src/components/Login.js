import React, { useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import './Login.css';
import { auth, provider } from './firebase';
import { signInWithPopup } from "firebase/auth";

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // This sends formData as JSON in the request body
      const response = await axios.post('https://blog-server1-nh16.onrender.com/login', formData);
      Cookie.set('token', response.data.token, { expires: 1 });
      Cookie.set('email',response.data.email,{expires:1}) // expires in 7 days
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Set token and email in cookies
      Cookie.set('token', user.accessToken, { expires: 1 });
      Cookie.set('email', user.email, { expires: 1 });
      Cookie.set('username', user.displayName, { expires: 1 });
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Google login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="glass-card">
        {/* Logo at the top */}
        <div className="https://img.freepik.com/premium-vector/word-concept-color-geometric-shapes-blog_205544-12899.jpg?semt=ais_hybrid&w=740" style={{ textAlign: 'center', marginBottom: 24 }}>
          {/* Use an image or text as your logo */}
          <img src="/logo192.png" alt="Logo" className="logo-img" style={{ height: 56 }} />
          {/* Or: <span className="logo-text">ZuAI</span> */}
        </div>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
            <span onClick={togglePassword} className="toggle-password">
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <button type="submit" className='login-button ' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="or-divider">or</div>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: 8 }}>
            <g>
              <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.2 5.5 29.4 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.4-4z"/>
              <path fill="#34A853" d="M6.3 14.1l6.6 4.8C14.5 16.1 18.9 13.5 24 13.5c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.2 5.5 29.4 3.5 24 3.5c-7.1 0-13.2 4.1-16.3 10.6z"/>
              <path fill="#FBBC05" d="M24 44.5c5.4 0 10.2-1.8 13.9-4.9l-6.4-5.2c-2 1.4-4.6 2.2-7.5 2.2-5.6 0-10.3-3.8-12-9l-6.6 5.1C7.8 40.2 15.3 44.5 24 44.5z"/>
              <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-3.9 4.9l6.4 5.2c1.8-1.7 3.2-4 3.8-6.6 0.3-1.2 0.5-2.5 0.5-3.9 0-1.4-.1-2.7-.4-4z"/>
            </g>
          </svg>
          Continue with Google
        </button>
        <p className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
