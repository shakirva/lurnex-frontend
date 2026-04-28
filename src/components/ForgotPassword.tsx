"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const success = await forgotPassword(email);
      if (success) {
        setStatus('success');
        setMessage('Password reset instructions have been sent to your email.');
      } else {
        setStatus('error');
        setMessage('Could not find an account with that email address.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">

          <h2 className="text-3xl font-bold text-slate-900">Reset Password</h2>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          {status === 'success' ? (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Check Your Email</h3>
              <p className="text-slate-600">{message}</p>
              <Link
                href="/login"
                className="block w-full py-4 px-4 bg-[#1B4696] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {message}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/10 focus:border-[#1B4696] transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg shadow-[#1B4696]/20 transition-all transform active:scale-[0.98] ${status === 'loading'
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-[#1B4696] hover:opacity-95 shadow-xl'
                  }`}
              >
                {status === 'loading' ? 'Sending Link...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <Link href="/login" className="text-sm font-bold text-[#1B4696] hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

