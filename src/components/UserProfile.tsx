"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfileAndApplications();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const fetchProfileAndApplications = async () => {
    try {
      setLoading(true);
      
      // 1. Get user profile
      const profileRes = await apiService.getProfile();
      if (profileRes.success) {
        setProfileData(profileRes.data);
      }

      // 2. Get applications (only for this user's email)
      const userEmail = profileRes.data?.email || user?.email;
      if (userEmail) {
        const appsRes = await apiService.getApplications({ email: userEmail } as any);
        if (appsRes.success) {
          // If the backend returned an object with .applications, use that.
          // Otherwise use the data array directly.
          const appsData = Array.isArray(appsRes.data) ? appsRes.data : (appsRes.data as any)?.applications || [];
          setApplications(appsData);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B4696]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Please Log In</h2>
          <p className="text-slate-600 mb-6">You need to be logged in to view your profile.</p>
          <Link href="/login" className="block w-full py-4 bg-[#1B4696] text-white rounded-xl font-bold hover:opacity-90">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="h-32 bg-gradient-to-r from-[#1B4696] to-[#2FBDB9]"></div>
              <div className="px-6 pb-8 -mt-16 text-center">
                <div className="inline-block p-1 bg-white rounded-full shadow-lg">
                  <div className="w-28 h-28 bg-slate-200 rounded-full flex items-center justify-center text-3xl font-bold text-[#1B4696] overflow-hidden">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-slate-900">{user?.first_name} {user?.last_name}</h2>
                <p className="text-slate-500 text-sm">@{user?.username}</p>
                <div className="mt-6 space-y-3 text-left border-t border-slate-50 pt-6">
                  <div className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-sm capitalize">{user?.role} Account</span>
                  </div>
                </div>
                <button className="mt-8 w-full py-3 border-2 border-[#1B4696] text-[#1B4696] rounded-xl font-bold hover:bg-[#1B4696] hover:text-white transition-all">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 bg-gradient-to-br from-white to-blue-50">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="bg-[#1B4696]/10 p-2 rounded-lg mr-3">💎</span>
                Subscription
              </h3>
              <div className="p-4 bg-[#1B4696] rounded-2xl text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">Current Plan</p>
                <h4 className="text-xl font-bold mt-1">Free Tier</h4>
                <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-0"></div>
                </div>
                <button className="mt-6 w-full py-2.5 bg-white text-[#1B4696] rounded-xl text-sm font-bold shadow-lg">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Applications & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 min-h-[500px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">My Applications</h3>
                <span className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                  {applications.length} Total
                </span>
              </div>

              {applications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <h4 className="text-lg font-bold text-slate-700">No applications yet</h4>
                  <p className="text-slate-500 mt-2">Start your career journey by applying to jobs</p>
                  <Link href="/jobs" className="mt-6 px-6 py-3 bg-[#1B4696] text-white rounded-xl font-bold shadow-lg shadow-[#1B4696]/20">
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100 hover:border-[#1B4696]/30 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2">
                           <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(app.job_title || 'J')}&background=random&size=100`} alt="Job" width={100} height={100} className="rounded-lg"/>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{app.job_title}</h4>
                          <p className="text-sm text-slate-500 text-sm">{app.company_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Accepted' ? 'bg-green-100 text-green-700' : 
                          app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {app.status || 'Pending'}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">{new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
