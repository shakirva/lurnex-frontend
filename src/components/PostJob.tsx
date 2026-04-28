"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// CATEGORIES will be fetched from API
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

const Field = ({ label, name, value, onChange, type = "text", as, children, ...rest }: any) => {
  const cls = "w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-600/5 transition-all text-sm font-semibold selection:bg-indigo-100 outline-none";
  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      {as === 'textarea' ? (
        <textarea name={name} className={`${cls} resize-none min-h-[120px]`} onChange={onChange} value={value} {...rest}>{children}</textarea>
      ) : as === 'select' ? (
        <select name={name} className={cls} onChange={onChange} value={value} {...rest}>{children}</select>
      ) : (
        <input type={type} name={name} className={cls} onChange={onChange} value={value} {...rest} />
      )}
    </div>
  );
};

export default function PostJob({ jobId }: { jobId?: number }) {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    category_id: 1,
    gender: 'Any',
    employer_email: '',
    employer_phone: '',
  });

  const [categories, setCategories] = useState<{id: number, name: string}[]>([
    {id: 1, name: "Accounting"},
    {id: 2, name: "Engineering"},
    {id: 3, name: "IT & Technology"},
    {id: 4, name: "Healthcare"},
    {id: 5, name: "Hospitality"},
    {id: 6, name: "Construction"},
    {id: 7, name: "Sales"},
    {id: 8, name: "Marketing"},
    {id: 9, name: "Education"},
    {id: 10, name: "Other"}
  ]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiService.getJobCategories();
      if (response.success && response.data) {
        const fetchedCategories = response.data;
        const hasAccounting = fetchedCategories.some((cat: any) => cat.name === "Accounting");
        
        if (!hasAccounting) {
          setCategories([{ id: 0, name: "Accounting" }, ...fetchedCategories]);
        } else {
          setCategories(fetchedCategories);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

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
      if (user?.first_name && !formData.company) {
        setFormData(prev => ({ ...prev, company: user.company_name || `${user.first_name}'s Company` }));
      }
    }
  }, [user, isAuthenticated, authLoading]);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const res = await apiService.getJobById(jobId!);
      if (res.success && res.data) {
        setFormData({
          title: res.data.title || '',
          company: res.data.company || '',
          location: res.data.location || '',
          type: res.data.type || 'Full-time',
          salary: res.data.salary || '',
          description: res.data.description || '',
          requirements: res.data.requirements?.join('\n') || '',
          category_id: res.data.category_id || 1,
          gender: res.data.gender || 'Any',
          employer_email: res.data.employer_email || '',
          employer_phone: res.data.employer_phone || '',
        });
      }
    } catch (err) {
      console.error("Error fetching job:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'category_id' ? parseInt(value) : value 
    }));
    setError('');
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        is_active: true,
        status: 'active'
      };

      const res = jobId
        ? await apiService.updateJob(jobId, payload)
        : await apiService.createJob(payload);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => router.push('/employer/dashboard'), 1500);
      } else {
        setError(res.message || 'Failed to save job. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
        />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-0' : 'lg:ml-64'} p-6 sm:p-8 lg:p-12 transition-all duration-300 min-h-screen`}>
        <div className="max-w-4xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{jobId ? 'Refine Listing' : 'Publish Opportunity'}</h2>
              <p className="text-slate-500 mt-1 font-medium italic text-sm">Attract top-tier candidates to your organization.</p>
            </div>
            <Link href="/employer/dashboard" className="w-fit px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg>
              Discard
            </Link>
          </header>

          {success ? (
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-10 sm:p-16 border border-slate-200 shadow-sm text-center animate-scaleIn">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">Successfully Processed</h3>
              <p className="text-slate-500 mt-2 font-medium text-sm">Your opportunity is now live on the TriaGull platform.</p>
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-10">
                {error && (
                  <div className="bg-rose-50 border-2 border-rose-100 text-rose-600 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    {error}
                  </div>
                )}

                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                    <Field label="Job Position Title *" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Product Architect" required />
                    <Field label="Company Name *" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Acme Innovations" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                    <Field label="Primary Location *" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Dubai, UAE" required />
                    <Field label="Contract Modality *" name="type" value={formData.type} onChange={handleChange} as="select" required>
                      {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                    </Field>
                  </div>
 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                     <Field label="Company Contact Email" name="employer_email" value={formData.employer_email} onChange={handleChange} placeholder="e.g. hr@company.com" type="email" />
                     <Field label="Direct Contact Number" name="employer_phone" value={formData.employer_phone} onChange={handleChange} placeholder="e.g. +1 234 567 890" />
                   </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
                    <Field label="Industry Sector" name="category_id" value={formData.category_id} onChange={handleChange} as="select">
                      <option value="">Selection required...</option>
                      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Field>
                    <Field label="Compensation Structure" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. ₹50k - ₹80k / Mo" />
                    <Field label="Candidate Benchmark" name="gender" value={formData.gender} onChange={handleChange} as="select">
                      {['Any', 'Male', 'Female'].map(g => <option key={g}>{g}</option>)}
                    </Field>
                  </div>

                  <Field label="Mission Overview *" name="description" value={formData.description} onChange={handleChange} as="textarea" placeholder="Detail the core responsibilities, strategic impact, and team environment..." required />

                  <Field label="Success Criteria (One per line)" name="requirements" value={formData.requirements} onChange={handleChange} as="textarea" placeholder={"- Expert proficiency in scalable system design\n- 5+ years driving high-impact product cycles\n- Strategic communication and mentorship skills"} />
                </div>

                <div className="flex items-center justify-end pt-10 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white shadow-xl transition-all ${loading ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-600/20'}`}
                  >
                    {loading ? 'Validating...' : jobId ? 'Commit Refinement' : 'Deploy Opportunity'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

