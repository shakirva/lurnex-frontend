"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiService, Job } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface Applicant {
  id: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  status: string;
  created_at: string;
  cover_letter?: string;
}

export default function JobApplicantsPage() {
  const params = useParams();
  const jobId = Number(params?.id);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      fetchData();
    }
  }, [isAuthenticated, authLoading, jobId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch job details to verify ownership and display header
      const jobRes = await apiService.getJobById(jobId);
      if (jobRes.success && jobRes.data) {
        setJob(jobRes.data);
      } else {
        throw new Error("Job not found");
      }

      // Fetch applicants
      const applicantsRes = await apiService.getApplicationsByJob(jobId);
      if (applicantsRes.success && applicantsRes.data) {
        setApplicants(applicantsRes.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load applicants");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      setUpdatingId(id);
      const res = await apiService.updateApplicationStatus(id, newStatus);
      if (res.success) {
        setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Error Accessing Applicants</h2>
        <p className="text-slate-500 mb-8 max-w-md">{error}</p>
        <button onClick={() => router.push("/employer/dashboard")} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dynamic Navigation Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <Link href="/employer/dashboard" className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-slate-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </Link>
              <div>
                <h1 className="text-lg font-black text-slate-900 truncate max-w-[200px] sm:max-w-md leading-none">{job?.title}</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Applicant Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider hidden sm:block">
                {applicants.length} Candidates
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {applicants.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-20 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={1.5} /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">No applicants yet</h3>
            <p className="text-slate-400 mt-2 font-medium max-w-sm mx-auto">This job post hasn't received any applications. Share your listing to find top talent!</p>
            <button onClick={() => router.push("/employer/dashboard")} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-lg">View My Listings</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {applicants.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-indigo-600/30 transition-all shadow-sm">
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Candidate Profile */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-xl font-black shadow-sm group-hover:scale-105 transition-transform shrink-0">
                      {a.applicant_name ? a.applicant_name[0] : '?'}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900">{a.applicant_name}</h4>
                      <p className="text-slate-500 font-medium text-sm flex items-center gap-2 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002-2z" strokeWidth={2} /></svg>
                        {a.applicant_email}
                      </p>
                      {a.applicant_phone && (
                        <p className="text-slate-500 font-medium text-sm flex items-center gap-2 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth={2}/></svg>
                          {a.applicant_phone}
                        </p>
                      )}
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">
                        Applied on {new Date(a.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Skills/Quick Details */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${a.status?.toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                        a.status?.toLowerCase() === 'shortlisted' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                          a.status?.toLowerCase() === 'hired' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                      {a.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 border-t lg:border-t-0 pt-6 lg:pt-0">
                    <div className="h-10 w-px bg-slate-200 mx-2 hidden lg:block" />

                    <div className="flex items-center gap-2">
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusUpdate(a.id, e.target.value)}
                        disabled={updatingId === a.id}
                        className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-100 outline-none transition-all cursor-pointer hover:bg-slate-50 disabled:opacity-50"
                      >
                        <option value="pending">Mark as Pending</option>
                        <option value="reviewing">Under Review</option>
                        <option value="shortlisted">Shortlist Target</option>
                        <option value="rejected">Reject Applicant</option>
                        <option value="hired">Confirm Hire</option>
                      </select>
                    </div>
                  </div>
                </div>

                {a.cover_letter && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl relative">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cover Letter</p>
                      <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-2 hover:line-clamp-none transition-all cursor-pointer">
                        "{a.cover_letter}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
