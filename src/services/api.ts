import axios from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, ProductsResponse } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
//   const response = await api.post('/auth/login', credentials);
//   return response.data;
// };

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }), // Change "email" to "username"
    });

    if (!response.ok) throw new Error("Invalid credentials");

    const data = await response.json();
    return data; // Return JWT token
  } catch (error) {
    throw new Error("Login failed");
  }
};


// export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
//   const response = await api.post('/auth/register', credentials);
//   return response.data;
// };

export const getProducts = async (page: number = 1, limit: number = 10): Promise<ProductsResponse> => {
  const response = await api.get(`/products?limit=${limit}&skip=${(page - 1) * limit}`);
  return {
    products: response.data,
    total: 100 // FakeStoreAPI doesn't provide total count, using static number
  };
};

export default api;