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
      
      if (profileRes.success && profileRes.data) {
        const data = profileRes.data;
        const mainUser = data.user || data;
        
        // Find the plan name in any possible location
        const foundPlan = data.plan_name || data.subscription?.plan_name || 
                        data.subscription?.name || mainUser.plan_name || 
                        data.plan || data.current_plan || data.membership_plan;
        
        // Find the expiry date in any possible location
        const foundExpiry = data.plan_expires_at || data.subscription?.expires_at || 
                          data.expires_at || mainUser.plan_expires_at;

        setProfileData({
          ...mainUser,
          ...data,
          displayPlan: (foundPlan && foundPlan.trim() !== "") ? foundPlan : 'Free Tier',
          displayExpiry: foundExpiry || null
        });
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
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mt-10">
          <div className="h-40 bg-gradient-to-r from-[#1B4696] to-[#2FBDB9]"></div>
          <div className="px-8 pb-10 -mt-20 text-center">
            <div className="inline-block p-1.5 bg-white rounded-full shadow-2xl">
              <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center text-4xl font-bold text-[#1B4696] overflow-hidden border-4 border-white">
                {(profileData?.first_name?.[0] || user?.first_name?.[0])}{(profileData?.last_name?.[0] || user?.last_name?.[0])}
              </div>
            </div>
            
            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              {profileData?.first_name || user?.first_name} {profileData?.last_name || user?.last_name}
            </h2>
            <p className="text-slate-500 font-medium">@{profileData?.username || user?.username}</p>
            <p className="text-slate-400 text-sm mt-1">{profileData?.email || user?.email}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-50 pt-8">
              <div className={`p-4 rounded-2xl text-center border transition-all ${
                profileData?.displayPlan?.toLowerCase()?.includes('premium') ? 'bg-indigo-50 border-indigo-100' :
                profileData?.displayPlan?.toLowerCase()?.includes('standard') ? 'bg-blue-50 border-blue-100' :
                'bg-slate-50 border-slate-100'
              }`}>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current Plan</p>
                <p className={`text-sm font-bold ${
                  profileData?.displayPlan?.toLowerCase()?.includes('premium') ? 'text-[#1B4696]' :
                  profileData?.displayPlan?.toLowerCase()?.includes('standard') ? 'text-blue-700' :
                  'text-slate-900'
                }`}>
                  {profileData?.displayPlan}
                  {profileData?.displayExpiry && profileData?.displayPlan !== 'Free Tier' && (
                    <span className="block mt-0.5 text-[9px] opacity-60 font-black tracking-widest uppercase">
                       Expires {new Date(profileData.displayExpiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Job Applications</p>
                <p className="text-sm font-bold text-[#1B4696]">{profileData?.application_count || 0}</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex-1 min-w-[140px] py-4 bg-[#1B4696] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#153470] transition-all shadow-xl shadow-blue-900/10">
                Manage Profile
              </button>
                {!profileData?.displayPlan || profileData?.displayPlan === 'Free Tier' ? (
                  <Link href="/subscription" className="flex-1 min-w-[140px] py-4 border-2 border-[#1B4696] text-[#1B4696] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1B4696] hover:text-white transition-all text-center">
                    Get Started
                  </Link>
                ) : (
                  <Link href="/subscription" className="flex-1 min-w-[140px] py-4 border-2 border-slate-200 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all text-center">
                    Change Plan
                  </Link>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
