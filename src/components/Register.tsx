"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    role: 'user' as 'user' | 'employer',
    company_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      
      if (response.success) {
        router.push(formData.role === 'employer' ? '/employer/dashboard' : '/jobs');
      } else {
        // If there are detailed errors from express-validator, show those
        const errorMsg = response.error || response.message || 'Registration failed. Username or email might already be taken.';
        setError(errorMsg);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Registration error:', err);
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
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-slate-600">
            Join Lurnex to find your dream job or hire top talent
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">First Name</label>
                <input
                  name="first_name"
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Last Name</label>
                <input
                  name="last_name"
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Username</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, role: 'user' }))}
                  className={`py-3 rounded-xl border-2 transition-all font-medium ${
                    formData.role === 'user' 
                      ? 'border-[#1B4696] bg-[#1B4696]/5 text-[#1B4696]' 
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, role: 'employer' }))}
                  className={`py-3 rounded-xl border-2 transition-all font-medium ${
                    formData.role === 'employer' 
                      ? 'border-[#1B4696] bg-[#1B4696]/5 text-[#1B4696]' 
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Employer
                </button>
              </div>
            </div>

            {formData.role === 'employer' && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Company Name</label>
                <input
                  name="company_name"
                  type="text"
                  required={formData.role === 'employer'}
                  value={formData.company_name}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Hub"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
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
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Confirm</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 011.012-2.123m7.787-7.787a10.05 10.05 0 011.743-.09c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.012 2.123M15 12a3 3 0 01-3 3m0 0l-1.5-1.5M12 9a3 3 0 00-3 3m1.5 1.5L12 12m4.5-5.5l-9 9" /></svg>
                    )}
                  </button>
                </div>
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
              {loading ? 'Creating Account...' : 'Get Started'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-[#1B4696] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
