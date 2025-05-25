import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handlePostCreated = () => {
    setRefreshPosts(!refreshPosts);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<BlogList refresh={refreshPosts} />} />
            <Route path="/posts/:id" element={<BlogDetail />} />
            <Route path="/new-post" element={<BlogForm onPostCreated={handlePostCreated} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />


          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
