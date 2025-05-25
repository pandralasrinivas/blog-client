import axios from 'axios';
import Cookie from 'js-cookie';

const API_URL = 'https://blog-server1-nh16.onrender.com';
export const getPosts = () => {
    return axios.get(`${API_URL}/posts`);
};

export const getPostById = (id) => {
    return axios.get(`${API_URL}/posts/${id}`);
};

export const fetchPosts = () => {
    return axios.get(`${API_URL}/posts`);
};

export const createPost = (postData) => {
    const token = Cookie.get('token');
    return axios.post(
        `${API_URL}/posts`,
        postData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const updatePost = (id, updatedData) => {
    return axios.put(`${API_URL}/posts/${id}`, updatedData);
};

export const deletePost = (id) => {
    return axios.delete(`${API_URL}/posts/${id}`);
};
