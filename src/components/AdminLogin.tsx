"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use only the AuthContext login function - it handles everything
      const success = await login(credentials.username, credentials.password);
      
      if (success) {
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Lurnex Logo"
              width={180}
              height={55}
              className="h-16 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Admin Login</h2>
          <p className="mt-2 text-sm text-slate-600">
            Access the admin dashboard to manage job vacancies
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.012-2.123m7.787-7.787a10.05 10.05 0 011.743-.09c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.012 2.123M15 12a3 3 0 01-3 3m0 0l-1.5-1.5M12 9a3 3 0 00-3 3m1.5 1.5L12 12m4.5-5.5l-9 9" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] hover:opacity-90'
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</h3>
            <p className="text-sm text-blue-700">
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> admin123
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-slate-600 hover:text-[#1B4696] transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
