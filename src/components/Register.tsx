"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";


export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
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
      const { confirmPassword, full_name, ...rest } = formData;

      // Split full name into first and last name for backend compatibility
      const nameParts = full_name.trim().split(' ');
      const first_name = nameParts[0];
      const last_name = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const registerData = {
        ...rest,
        first_name,
        last_name
      };

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
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="TriaGull Logo"
                width={180}
                height={55}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-slate-600">
            Join TriaGull to find your dream job or hire top talent
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
                <input
                  name="full_name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Username</label>
                  <input
                    name="username"
                    type="text"
                    required
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                  />
                </div>
              </div>
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
                  className={`py-3 rounded-xl border-2 transition-all font-medium ${formData.role === 'user'
                      ? 'border-[#1B4696] bg-[#1B4696]/5 text-[#1B4696]'
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, role: 'employer' }))}
                  className={`py-3 rounded-xl border-2 transition-all font-medium ${formData.role === 'employer'
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
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
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
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}

                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg shadow-[#1B4696]/20 transition-all transform active:scale-[0.98] ${loading
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

