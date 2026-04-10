"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function EmployerApplicants({ jobId }: { jobId: number }) {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

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

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const statusColors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Reviewing: "bg-blue-50 text-blue-700 border-blue-100",
    Accepted: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Rejected: "bg-rose-50 text-rose-700 border-rose-100",
  };

  const sidebarLinks = [
    { label: "Dashboard", href: "/employer/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Add Job", href: "/employer/post-job", icon: "M12 4v16m8-8H4" },
    { label: "Profile", href: "/employer/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { label: "Site", href: "/", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" },
  ];

  if (authLoading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-900 border-t-transparent"/></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-6 right-6 z-[60] w-12 h-12 bg-white border border-slate-200 rounded-2xl shadow-xl flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all active:scale-90"
      >
        {isSidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        )}
      </button>

      {/* Sidebar - Compact and Modern */}
      <aside className={`w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20">L</div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">TriaGull Jobs</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          {sidebarLinks.map((link) => {
            const isActive = link.href === "/employer/dashboard" ? (pathname === "/employer/dashboard" || pathname.startsWith("/employer/applicants")) : pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <svg className={`w-5 h-5 transition-colors ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
             <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                {user?.first_name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.first_name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{user?.role}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 py-2.5 w-full bg-white border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
        />
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-0' : 'lg:ml-64'} p-6 sm:p-8 lg:p-12 transition-all duration-300 min-h-screen`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Hiring Pipeline</h2>
            <p className="text-slate-500 mt-2 font-medium text-sm">Screen and manage candidates for your vacancy.</p>
          </div>
          <Link href="/employer/dashboard" className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg>
            Dashboard
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"/></div>
        ) : applicants.length === 0 ? (
          <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 p-12 sm:p-24 text-center">
            <div className="w-20 h-20 sm:w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 sm:w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={1.5}/></svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">No Applications Yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium text-sm">When candidates apply for this position, they will appear here for your review.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* List */}
            <div className="xl:col-span-4 space-y-4 order-2 xl:order-1">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-6 text-center xl:text-left">Candidates ({applicants.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
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
                          {app.status || 'Pending'} {app.applicant_phone && `• ${app.applicant_phone}`}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* View */}
            <div className="xl:col-span-8 order-1 xl:order-2">
              {selected ? (
                <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden sticky top-10">
                  <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-slate-900 rounded-[1.5rem] flex items-center justify-center text-white font-black text-3xl shadow-2xl">
                          {selected.applicant_name?.[0] || 'A'}
                        </div>
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{selected.applicant_name}</h3>
                          <p className="text-slate-500 font-bold mt-1 text-sm">{selected.applicant_email}</p>
                          {selected.applicant_phone && <p className="text-slate-400 text-xs mt-0.5">Contact: {selected.applicant_phone}</p>}
                        </div>
                      </div>
                      <span className={`px-5 py-2.5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest ${statusColors[selected.status] || statusColors['Pending']}`}>
                        {selected.status || 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-10 space-y-10">
                    {selected.cover_letter && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Personal Statement</h4>
                        <div className="p-6 sm:p-8 bg-slate-50 rounded-[1.5rem] sm:rounded-[2rem] text-slate-700 leading-relaxed font-medium text-sm">
                          {selected.cover_letter}
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Decision Hub</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

                    <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                      <a
                        href={`mailto:${selected.applicant_email}?subject=Application Status: ${selected.job_title}`}
                        className="w-full sm:flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest text-center hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth={2}/></svg>
                        Initiate Contact
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden xl:flex bg-slate-100/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex-col items-center justify-center p-20 text-center">
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

