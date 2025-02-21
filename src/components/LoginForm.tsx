import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Trim spaces to avoid user input errors
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // Debugging: Log input values
    console.log("Entered Email:", trimmedEmail);
    console.log("Entered Password:", trimmedPassword);

    // Fake credentials for validation
    const validEmail = 'user@example.com';
    const validPassword = 'password123';

    if (trimmedEmail === validEmail && trimmedPassword === validPassword) {
      login(trimmedEmail);
      toast.success('Successfully logged in!');
      navigate('/products');
    } else {
      toast.error('Invalid credentials');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;