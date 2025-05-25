import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { auth, provider } from './firebase';
import { signInWithPopup } from "firebase/auth";

function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, username, email, password, confirmPassword } = formData;

    if (!fullname || !username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      setSuccess('Registration successful! You can now log in.');
      setFormData({ fullname: '', username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Optionally send user info to your backend here
      // For now, just set a cookie and redirect
      document.cookie = `token=${user.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Google registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="glass-card">
        {/* Logo at the top */}
        <div className="register-logo" style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/029/898/151/small/blog-bubble-on-white-background-internet-technology-logo-communication-technology-vector.jpg" alt="Logo" className="logo-img" style={{ height: 56 }} />
          {/* Or: <span className="logo-text">ZuAI</span> */}
        </div>
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
            <span onClick={togglePassword} className="toggle-password">
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field"
          />
          <button type="submit" className='register-button' disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="or-divider">or</div>
        <button className="google-login-button" onClick={handleGoogleRegister}>
          <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: 8 }}>
            <g>
              <path fill="#4285F4" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.2 5.5 29.4 3.5 24 3.5 12.7 3.5 3.5 12.7 3.5 24S12.7 44.5 24 44.5c11 0 20.5-8.5 20.5-20.5 0-1.4-.1-2.7-.4-4z"/>
              <path fill="#34A853" d="M6.3 14.1l6.6 4.8C14.5 16.1 18.9 13.5 24 13.5c3.1 0 5.9 1.1 8.1 3l6.1-6.1C34.2 5.5 29.4 3.5 24 3.5c-7.1 0-13.2 4.1-16.3 10.6z"/>
              <path fill="#FBBC05" d="M24 44.5c5.4 0 10.2-1.8 13.9-4.9l-6.4-5.2c-2 1.4-4.6 2.2-7.5 2.2-5.6 0-10.3-3.8-12-9l-6.6 5.1C7.8 40.2 15.3 44.5 24 44.5z"/>
              <path fill="#EA4335" d="M43.6 20.5h-1.9V20H24v8h11.3c-0.7 2-2.1 3.7-3.9 4.9l6.4 5.2c1.8-1.7 3.2-4 3.8-6.6 0.3-1.2 0.5-2.5 0.5-3.9 0-1.4-.1-2.7-.4-4z"/>
            </g>
          </svg>
          Register with Google
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
