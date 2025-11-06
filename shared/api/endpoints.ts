/**
 * API Endpoints
 * Shared API endpoint definitions used across all platforms
 */

export const API_BASE_URL = 'https://api.example.com';

export const ENDPOINTS = {
  // Authentication
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh'
  },
  
  // Users
  users: {
    list: '/api/users',
    profile: (id: string) => `/api/users/${id}`,
    update: (id: string) => `/api/users/${id}`,
    delete: (id: string) => `/api/users/${id}`
  },
  
  // Posts
  posts: {
    list: '/api/posts',
    detail: (id: string) => `/api/posts/${id}`,
    create: '/api/posts',
    update: (id: string) => `/api/posts/${id}`,
    delete: (id: string) => `/api/posts/${id}`
  }
};

export const API_TIMEOUT = 30000; // 30 seconds
