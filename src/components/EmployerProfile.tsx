"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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

export default function EmployerProfile() {
  const { user, isAuthenticated, logout, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    company_name: user?.company_name || '',
    company_description: '',
    website: '',
    phone: user?.phone || '',
  });

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
      setFormData(prev => ({
        ...prev,
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        company_name: user?.company_name || '',
        phone: user?.phone || '',
      }));
    }
  }, [isAuthenticated, authLoading, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await apiService.updateEmployerProfile(formData);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.message || 'Failed to update profile.');
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
    { label: "My Listings", href: "/employer/dashboard", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { label: "Profile", href: "/employer/profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { label: "Site", href: "/", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Organization Profile</h2>
            <p className="text-slate-500 mt-1 font-medium italic">Configure your public presence and team identity.</p>
          </header>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-10">
              {success && (
                <div className="bg-emerald-50 border-2 border-emerald-100 text-emerald-600 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-fadeIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Configurations Updated Synchronously
                </div>
              )}
              {error && (
                <div className="bg-rose-50 border-2 border-rose-100 text-rose-600 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 animate-fadeIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                  {error}
                </div>
              )}

              <div className="space-y-12">
                <section>
                  <h4 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <span className="w-6 h-px bg-indigo-200" />
                    Identity
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Field label="Direct First Name" name="first_name" value={formData.first_name} onChange={handleChange} />
                    <Field label="Direct Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />
                  </div>
                </section>

                <section>
                  <h4 className="text-[12px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <span className="w-6 h-px bg-indigo-200" />
                    Organizational
                  </h4>
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Field label="Entity Name" name="company_name" value={formData.company_name} onChange={handleChange} />
                      <Field label="Corporate Hub URL" name="website" value={formData.website} onChange={handleChange} placeholder="https://organization.com" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <Field label="Contact Channel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+971 -- --- ----" />
                      <div className="flex flex-col justify-end pb-1 opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Secure verification required for secondary contact channels.</p>
                      </div>
                    </div>
                    <Field label="Strategic Mission Statement" name="company_description" value={formData.company_description} onChange={handleChange} as="textarea" placeholder="Describe the core values and strategic mission of your organization..." />
                  </div>
                </section>
              </div>

              <div className="pt-10 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white shadow-xl transition-all ${loading ? 'bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-indigo-600/20'}`}
                >
                  {loading ? 'Processing...' : 'Commit Settings'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
