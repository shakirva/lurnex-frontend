"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function EmployerApplicants({ jobId }: { jobId: number }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      fetchApplicants();
    }
  }, [jobId, isAuthenticated, authLoading]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const res = await apiService.getApplications({ status: undefined });
      const filtered = (res.data || []).filter((a: any) => a.job_id === jobId || !jobId);
      setApplicants(filtered);
      if (filtered.length > 0 && !selected) setSelected(filtered[0]);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await apiService.updateApplicationStatus(id, status);
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      if (selected?.id === id) setSelected((prev: any) => ({ ...prev, status }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Reviewing: "bg-blue-50 text-blue-700 border-blue-100",
    Accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Rejected: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const sidebarLinks = [
    { label: "Dashboard", href: "/employer/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Post a New Job", href: "/employer/post-job", icon: "M12 4v16m8-8H4" },
    { label: "My Listings", href: "/employer/dashboard", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2" },
    { label: "Settings", href: "/employer/profile", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  ];

  if (authLoading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-900 border-t-transparent"/></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex font-outfit">
      {/* Sidebar - Fixed */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-slate-900 group-hover:scale-110 transition-all">L</div>
            <span className="text-xl font-bold tracking-tight">Lurnex Employer</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {sidebarLinks.map((link) => {
            const isActive = link.href === "/employer/dashboard" ? (pathname === "/employer/dashboard" || pathname.startsWith("/employer/applicants")) : pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive 
                    ? "bg-slate-800 text-white shadow-lg" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <svg className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-4">
             <Link href="/" className="flex items-center justify-center gap-2 py-3 w-full bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold transition-all">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg>
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Hiring Pipeline</h2>
            <p className="text-slate-500 mt-2 font-medium">Screen and manage candidates for {applicants[0]?.job_title || 'your vacancy'}.</p>
          </div>
          <Link href="/employer/dashboard" className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg>
            Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-slate-900"/></div>
        ) : applicants.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-24 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={1.5}/></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">No Applications Yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">When candidates apply for this position, they will appear here for your review.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* List */}
            <div className="xl:col-span-4 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-6">Candidates ({applicants.length})</h4>
              <div className="space-y-3">
                {applicants.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelected(app)}
                    className={`w-full text-left p-5 rounded-[1.5rem] border-2 transition-all duration-300 group ${
                      selected?.id === app.id 
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10 -translate-y-1" 
                        : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors ${selected?.id === app.id ? 'bg-white/10' : 'bg-slate-100 text-slate-900'}`}>
                        {app.applicant_name?.[0] || 'A'}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className={`font-bold truncate ${selected?.id === app.id ? 'text-white' : 'text-slate-900'}`}>{app.applicant_name}</p>
                        <p className={`text-[10px] uppercase font-black tracking-widest mt-1 ${selected?.id === app.id ? 'text-white/60' : 'text-slate-400'}`}>
                          {app.status || 'Pending'}
                        </p>
                      </div>
                      {selected?.id === app.id && (
                        <svg className="w-5 h-5 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"/></svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* View */}
            <div className="xl:col-span-8">
              {selected ? (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden sticky top-10">
                  <div className="p-10 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl shadow-2xl">
                          {selected.applicant_name?.[0] || 'A'}
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-slate-900 tracking-tight">{selected.applicant_name}</h3>
                          <p className="text-slate-500 font-bold mt-1">{selected.applicant_email}</p>
                          {selected.applicant_phone && <p className="text-slate-400 text-sm mt-0.5">Contact: {selected.applicant_phone}</p>}
                        </div>
                      </div>
                      <span className={`px-5 py-2.5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest ${statusColors[selected.status] || statusColors['Pending']}`}>
                        {selected.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="p-10 space-y-10">
                    {selected.cover_letter && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Statement</h4>
                        <div className="p-8 bg-slate-50 rounded-[2rem] text-slate-700 leading-relaxed font-medium">
                          {selected.cover_letter}
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Decision Hub</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Pending', 'Reviewing', 'Accepted', 'Rejected'].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(selected.id, status)}
                            className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border-2 transition-all active:scale-95 ${
                              selected.status === status
                                ? `${statusColors[status]} border-current shadow-lg shadow-black/5`
                                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex items-center gap-4">
                      <a
                        href={`mailto:${selected.applicant_email}?subject=Application Status: ${selected.job_title}`}
                        className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2}/></svg>
                        Initiate Contact
                      </a>
                      <button className="p-5 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" strokeWidth={2.5}/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-100/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-20 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2}/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2}/></svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Preview Candidate</h4>
                  <p className="text-slate-400 mt-2 max-w-xs font-medium">Select a name from the pipeline on the left to review their full profile.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
