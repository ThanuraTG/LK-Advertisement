// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   register: (userData) => api.post('/auth/register', userData),
// };

// // Users API
// export const usersAPI = {
//   getProfile: (id) => api.get(`/users/${id}`),
//   updateProfile: (id, userData) => api.put(`/users/${id}`, userData),
// };

// // Posts API
// export const postsAPI = {
//   getAllPosts: () => api.get('/posts'),
//   getPostById: (id) => api.get(`/posts/${id}`),
//   getPostsByCategory: (category) => api.get(`/posts/category/${category}`),
//   getLatestPosts: (limit = 10) => api.get(`/posts/latest?limit=${limit}`),
//   createPost: (postData) => api.post('/posts', postData),
//   updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
//   deletePost: (id) => api.delete(`/posts/${id}`),
//   getUserPosts: (userId) => api.get(`/posts/user/${userId}`),
// };

// export default api;


import axios from 'axios';

// Vite uses different port, typically 5173
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    
  },
});


// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);



// 🔹 Add Authorization header automatically if token exists
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });


export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getUserById: (id) => api.get(`/users/${id}`),
  // getProfile: () => api.get('/auth/api/users'), // <-- user details get endpoint
};

export const usersAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, userData) => api.put(`/users/${id}`, userData),
};

export const postsAPI = {
  getAllPosts: () => api.get('/posts'),
  getPostById: (id) => api.get(`/posts/${id}`),
  getPostsByCategory: (category) => api.get(`/posts/category/${category}`),
  getLatestPosts: (limit = 10) => api.get(`/posts/latest?limit=${limit}`),
  createPost: (postData) => api.post('/posts', postData),
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  deletePost: (id) => api.delete(`/posts/${id}`),
  getUserPosts: (userId) => api.get(`/posts/user/${userId}`),
};

export default api;






// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export const authAPI = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   register: (userData) => api.post('/auth/register', userData),
//   getUserById: (id) => api.get(`/users/${id}`),
// };

// export const usersAPI = {
//   getProfile: (id) => api.get(`/users/${id}`),
//   updateProfile: (id, userData) => api.put(`/users/${id}`, userData),
// };

// export const postsAPI = {
//   getAllPosts: () => api.get('/posts'),
//   getPostById: (id) => api.get(`/posts/${id}`),
//   getPostsByCategory: (category) => api.get(`/posts/category/${category}`),
//   getPostsByCategoryAndCondition: (category, condition) => api.get(`/posts/category/${category}/filter?condition=${condition}`),
//   getLatestPosts: (limit = 10) => api.get(`/posts/latest?limit=${limit}`),
//   createPost: (postData) => api.post('/posts', postData),
//   updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
//   deletePost: (id) => api.delete(`/posts/${id}`),
//   getUserPosts: (userId) => api.get(`/posts/user/${userId}`),
// };

// export const favoritesAPI = {
//   getUserFavorites: (userId) => api.get(`/favorites/user/${userId}`),
//   checkFavorite: (userId, postId) => api.get(`/favorites/check?userId=${userId}&postId=${postId}`),
//   addFavorite: (favoriteData) => api.post('/favorites', favoriteData),
//   removeFavorite: (userId, postId) => api.delete(`/favorites?userId=${userId}&postId=${postId}`),
// };

// export default api;