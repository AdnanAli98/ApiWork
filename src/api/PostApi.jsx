import axios from 'axios';
const api = axios.create ({
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

});

// Get all posts

export const getPosts = async () => { 
    return api.get('/posts')
  };

// Delete a post  

export const deletePost = async (id) => {
    return api.delete(`/posts/${id}`)
  }

// Add a post 
export const addPost = async (data) => {
    return api.post('/posts', data)
  } 

// Update a post
export const updatePost = async (id, post) => {
    return api.put(`/posts/${id}`, post)
  }
