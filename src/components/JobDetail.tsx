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
    resume: null as File | null,
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
          setJob(null);
        }
      } catch (err) {
        setJob(null);
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
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title} Job Opening in {job.location}</h1>
              <div className="flex items-center gap-2 text-slate-600 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>
            </div>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              {job.type}
            </span>
          </div>

          {/* Apply Button */}
          <div className="mb-8">
            <button
              onClick={handleApply}
              disabled={applied}
              className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                applied
                  ? "bg-green-100 text-green-800 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {applied ? "APPLIED" : "APPLY NOW"}
            </button>
          </div>

          {/* Job Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-slate-600 font-medium">Food & Accommodation:</span>
                <span className="ml-2 text-slate-900">NO</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-slate-700">Required Gender:</span>
                  <span className="ml-2 text-slate-900">Any</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Qualification:</span>
                  <span className="ml-2 text-slate-900">{job.requirements[job.requirements.length - 1]}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Job Description</h3>
              <p className="text-slate-700 leading-relaxed">{job.description}</p>
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
                      Resume *
                    </label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <svg className="w-12 h-12 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-slate-600 font-medium">
                        {formData.resume ? formData.resume.name : 'Click to upload resume'}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </label>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                          {/* Left Side - QR Code */}
                          <div className="text-center">
                            <div className="bg-slate-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-3">
                              {/* Sample QR Code - Replace with actual QR code image */}
                              <div className="w-46 h-46 bg-white p-2 rounded-lg border-2 border-slate-300">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                  <rect width="100" height="100" fill="white"/>
                                  <rect x="10" y="10" width="15" height="15" fill="black"/>
                                  <rect x="30" y="10" width="5" height="5" fill="black"/>
                                  <rect x="40" y="10" width="10" height="10" fill="black"/>
                                  <rect x="55" y="10" width="5" height="5" fill="black"/>
                                  <rect x="75" y="10" width="15" height="15" fill="black"/>
                                  <rect x="10" y="30" width="5" height="5" fill="black"/>
                                  <rect x="20" y="30" width="5" height="5" fill="black"/>
                                  <rect x="35" y="30" width="10" height="10" fill="black"/>
                                  <rect x="50" y="30" width="5" height="5" fill="black"/>
                                  <rect x="65" y="30" width="10" height="10" fill="black"/>
                                  <rect x="85" y="30" width="5" height="5" fill="black"/>
                                  <rect x="10" y="45" width="5" height="5" fill="black"/>
                                  <rect x="25" y="45" width="15" height="15" fill="black"/>
                                  <rect x="60" y="45" width="15" height="15" fill="black"/>
                                  <rect x="85" y="45" width="5" height="5" fill="black"/>
                                  <rect x="10" y="65" width="10" height="10" fill="black"/>
                                  <rect x="30" y="65" width="5" height="5" fill="black"/>
                                  <rect x="45" y="65" width="10" height="10" fill="black"/>
                                  <rect x="70" y="65" width="5" height="5" fill="black"/>
                                  <rect x="10" y="75" width="15" height="15" fill="black"/>
                                  <rect x="40" y="75" width="5" height="5" fill="black"/>
                                  <rect x="55" y="75" width="10" height="10" fill="black"/>
                                  <rect x="75" y="75" width="15" height="15" fill="black"/>
                                </svg>
                              </div>
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
