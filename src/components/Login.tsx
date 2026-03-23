"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
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
      const success = await login(credentials.username, credentials.password);
      
      if (success) {
        // The AuthContext doesn't expose the user directly in the return of login, 
        // but it updates the state. We can use a short delay or check the stored user.
        // For now, let's assume the backend returns the user role in the response which is stored.
        const userData = localStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          if (user.role === 'admin') router.push('/admin');
          else if (user.role === 'employer') router.push('/employer/dashboard');
          else router.push('/jobs');
        } else {
          router.push('/jobs');
        }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Lurnex Logo"
                width={180}
                height={55}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                Username or Email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#1B4696] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
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
              className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg shadow-[#1B4696]/20 transition-all transform active:scale-[0.98] ${
                loading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1B4696] to-[#2FBDB9] hover:opacity-95 hover:shadow-xl'
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-[#1B4696] hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
          <p className="text-xs text-blue-800 text-center">
            <span className="font-bold">Admin Demo:</span> admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
