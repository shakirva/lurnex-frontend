"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Job } from "@/lib/api";

interface JobDetailProps {
  jobId: string;
}

export default function JobDetail({ jobId }: JobDetailProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    paymentReceipt: null as File | null
  });

  const router = useRouter();

  useEffect(() => {
    // Fetch job from API instead of mockJobs
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await import("@/lib/api").then(mod => mod.apiService.getJobById(parseInt(jobId)));
        if (response.success && response.data) {
          setJob(response.data);
        } else {
          // Explicitly null if not found
          setJob(null);
        }
      } catch (err: any) {
        console.error("❌ Job load failed:", err);
        // If it's a true 404 or missing job, then set null
        if (err.message?.includes('found')) {
          setJob(null);
        }
        // Otherwise, it might be a network error - don't show "Not Found" yet
      }

      setLoading(false);
    };
    fetchJob();
  }, [jobId]);

  const handleApply = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
    setShowForm(false);
    // In a real app, this would submit the form data
    setTimeout(() => {
      alert("Application submitted successfully!");
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const { name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleDemoPayment = () => {
    const fakeReceipt = new File(["demo-content"], "demo-receipt.png", { type: "image/png" });
    setFormData(prev => ({
      ...prev,
      paymentReceipt: fakeReceipt
    }));
    alert("🏦 DEMO: Payment simulated! You can now submit your application.");
  };

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1B4696] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Not Found</h2>
          <p className="text-slate-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/jobs"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-lg font-medium hover:opacity-90 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Jobs
          </button>
        </div>

        {/* Job Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8 overflow-hidden relative">
          {job.is_masked && (
            <div className="absolute top-0 right-0">
              <div className="bg-slate-900 text-white text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest origin-top-right rotate-45 translate-x-8 translate-y-3 shadow-sm">
                Locked
              </div>
            </div>
          )}

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {job.title} Job Opening {job.is_masked ? '' : `at ${job.company}`}
              </h1>
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>
            </div>
            <span className="bg-slate-100 text-slate-700 text-sm font-bold px-4 py-1.5 rounded-lg uppercase tracking-wider">
              {job.type}
            </span>
          </div>

          {/* Apply Button / Upgrade Banner */}
          <div className="mb-10">
            {job.is_masked ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Subscription Required</h3>
                    <p className="text-sm text-slate-500">Subscribe to a plan to see full details and apply for this job.</p>
                  </div>
                </div>
                <Link
                  href="/subscription"
                  className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all text-center"
                >
                  View Plans & Unlock
                </Link>
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applied}
                className={`flex items-center gap-2 px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-md active:scale-95 ${applied
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {applied ? "ALREADY APPLIED" : "APPLY FOR THIS JOB"}
              </button>
            )}
          </div>

          {/* Job Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Job Description
                </h3>
                <div className={`relative ${job.is_masked ? 'p-4' : ''}`}>
                  <p className={`text-slate-600 leading-relaxed whitespace-pre-line ${job.is_masked ? 'blur-[3px] select-none' : ''}`}>
                    {job.description}
                  </p>
                  {job.is_masked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-lg border border-slate-100 p-6 text-center">
                      <p className="text-slate-900 font-bold mb-2">Content Locked</p>
                      <p className="text-sm text-slate-500 max-w-sm">Full job description is only available to subscribed members.</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Requirements
                </h3>
                <ul className={`space-y-3 ${job.is_masked ? 'blur-[3px] select-none opacity-50' : ''}`}>
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 sticky top-24">
                <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Overview</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Salary</p>
                      <p className={`font-bold ${job.is_masked ? 'text-slate-400 italic' : 'text-slate-900'}`}>{job.salary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Company</p>
                      <p className={`font-bold ${job.is_masked ? 'text-slate-400 italic' : 'text-slate-900'}`}>
                        {job.is_masked ? 'Locked' : job.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Gender</p>
                      <p className="font-bold text-slate-900">{job.gender || 'Any'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Apply for {job?.title}</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                      placeholder="Enter your phone number"
                    />
                  </div>



                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                      placeholder="Tell us why you're interested in this position..."
                    />
                  </div>

                  {/* Payment Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Application Fee Payment
                    </h3>

                    <div className="space-y-6">
                      {/* Top Row - QR Scanner Section */}
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm font-semibold text-slate-700">Scan & Pay</p>
                          <button
                            type="button"
                            onClick={handleDemoPayment}
                            className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                          >
                            🚀 DEMO: SKIP PAYMENT
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                          {/* Left Side - QR Code */}
                          <div className="text-center">
                            <div className="bg-slate-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                              <Image
                                src="/driehoek-qrcode.png"
                                alt="Payment QR Code"
                                width={192}
                                height={192}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-xs text-slate-500">Scan QR Code to Pay</p>
                          </div>

                          {/* Right Side - Subscription Plans */}
                          <div>
                            <p className="text-sm font-semibold text-slate-700 mb-3 text-center">Choose Your Subscription Plan</p>

                            {/* Subscription Plans in Two Rows */}
                            <div className="space-y-3">
                              {/* 3 Month Plan - Top Row */}
                              <div className="p-3 border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-bold text-blue-900">3 Month Plan</h4>
                                    <p className="text-xs text-blue-700">Unlimited vacancy access</p>
                                  </div>
                                  <span className="text-lg font-bold text-green-600">₹399</span>
                                </div>
                              </div>

                              {/* 6 Month Plan - Bottom Row */}
                              <div className="p-3 border border-emerald-200 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-bold text-emerald-900">6 Month Plan</h4>
                                    <p className="text-xs text-emerald-700">Unlimited vacancy access</p>
                                  </div>
                                  <span className="text-lg font-bold text-green-600">₹499</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row - Payment Receipt Upload */}
                      <div className="bg-white rounded-lg p-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Payment Receipt Upload *
                        </label>
                        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-white">
                          <input
                            type="file"
                            name="paymentReceipt"
                            accept="image/*,.pdf"
                            onChange={handleFileChange}
                            required
                            className="hidden"
                            id="receipt-upload"
                          />
                          <label
                            htmlFor="receipt-upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <svg className="w-12 h-12 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-slate-600 font-medium">
                              {formData.paymentReceipt ? formData.paymentReceipt.name : 'Upload Payment Receipt'}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">JPG, PNG, PDF (Max 2MB)</p>
                          </label>
                        </div>
                        <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Upload screenshot of payment confirmation
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
