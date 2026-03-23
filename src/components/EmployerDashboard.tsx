"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface DashboardStats {
  totalJobs: number;
  totalApplicants: number;
  activeJobs: number;
  hiredCount: number;
}

export default function EmployerDashboard() {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<DashboardStats>({ totalJobs: 0, totalApplicants: 0, activeJobs: 0, hiredCount: 0 });
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
        return;
      }
      if (user?.role !== "employer" && user?.role !== "admin") {
        router.push("/");
        return;
      }
      fetchJobs();
    }
  }, [isAuthenticated, authLoading, user]);

  useEffect(() => {
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      
      // Parallel fetch for jobs and stats
      const [jobsRes, statsRes] = await Promise.all([
        apiService.getEmployerJobs(),
        apiService.getApplicationStats()
      ]);

      const myJobs = jobsRes.data || [];
      setJobs(myJobs);
      setFilteredJobs(myJobs);
      
      const appStats = statsRes.data || { total: 0, byStatus: [] };
      const hiredItem = appStats.byStatus?.find((s: any) => s.status?.toLowerCase() === 'hired');
      
      setStats({
        totalJobs: myJobs.length,
        activeJobs: myJobs.filter((j: any) => j.is_active !== 0).length,
        totalApplicants: appStats.total || 0,
        hiredCount: hiredItem ? hiredItem.count : 0
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
      </div>
    );
  }

  const sidebarLinks = [
    { label: "Dashboard", href: "/employer/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { label: "Add Job", href: "/employer/post-job", icon: "M12 4v16m8-8H4" },
    { label: "Profile", href: "/employer/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { label: "Site", href: "/", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar - Compact and Modern */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20">L</div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Lurnex Hub</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
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

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-x-hidden">
        {/* Superior Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Employer Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Empower your team with elite talent.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100 text-indigo-700 text-xs font-bold">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
               System Operational
             </div>
             <Link
              href="/employer/post-job"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
              Post Opportunity
            </Link>
          </div>
        </header>

        {/* Improved Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Postings", value: stats.activeJobs, color: "text-indigo-600", bg: "bg-indigo-50", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            { label: "Applicants", value: stats.totalApplicants, color: "text-emerald-600", bg: "bg-emerald-50", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
            { label: "Hires", value: stats.hiredCount, color: "text-amber-600", bg: "bg-amber-50", icon: "M9 12l2 2 4-4" },
          ].map((s, i) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center transition-transform group-hover:scale-110 shrink-0`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon}/></svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                <h4 className="text-2xl font-black text-slate-900 mt-0.5">{s.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Listings Focus Section */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-none">Live Listings</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">{jobs.length} open positions</p>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input 
                type="text" 
                placeholder="Find a listing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-600/5 focus:outline-none transition-all text-sm font-semibold"
              />
            </div>
          </div>

          <div className="p-4">
            {filteredJobs.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={2}/></svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900">No matching listings</h4>
                <p className="text-slate-400 mt-2 font-medium">Try refining your search or create a new post.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="group p-3 bg-white hover:bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-base shadow-lg shadow-black/10 group-hover:scale-105 transition-transform">
                        {job.title[0]}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-slate-900 truncate pr-4">{job.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] font-bold text-slate-400 tracking-wide uppercase">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth={2.5}/></svg>
                            <span className="truncate">{job.location}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5}/></svg>
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidates</p>
                        <p className="text-xl font-black text-slate-900 leading-none mt-1">{job.applicant_count || 0}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link 
                          href={`/employer/applicants/${job.id}`} 
                          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-md shadow-black/5 flex items-center gap-2"
                        >
                          Candidates
                        </Link>
                        <Link 
                          href={`/employer/edit-job/${job.id}`} 
                          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-300 transition-all font-bold"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth={2.5}/></svg>
                        </Link>
                        
                        {deleteConfirm === job.id ? (
                          <div className="flex items-center gap-1.5 scale-95 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards' }}>
                            <button onClick={() => handleDelete(job.id)} className="px-4 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => setDeleteConfirm(job.id)} 
                            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2.5}/></svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
