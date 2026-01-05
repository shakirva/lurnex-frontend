"use client";

import React, { useState } from "react";
import Image from "next/image";
import { type Job, apiService } from "@/lib/api";

interface ApplicationFormModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationFormModal({ job, isOpen, onClose }: ApplicationFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    paymentReceipt: null as File | null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const applicationData = new FormData();
      applicationData.append('job_id', job.id.toString());
      applicationData.append('applicant_name', formData.name);
      applicationData.append('applicant_email', formData.email);
      applicationData.append('applicant_phone', formData.phone);
      applicationData.append('cover_letter', formData.coverLetter);

      if (formData.resume) {
        applicationData.append('resume', formData.resume);
      }
      if (formData.paymentReceipt) {
        applicationData.append('payment_file', formData.paymentReceipt);
      }

      const response = await apiService.submitApplication(applicationData);

      if (response.success) {
        alert("Application submitted successfully!");
        onClose();
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          resume: null,
          coverLetter: '',
          paymentReceipt: null
        });
      } else {
        setError(response.message || 'Failed to submit application');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Apply for {job.title}
              </h2>
              <p className="text-sm text-slate-600">
                {job.company} • {job.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Personal Info & Resume */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
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
                      <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm text-slate-600 font-medium">
                        {formData.resume ? formData.resume.name : 'Click to upload resume'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4696]/20 focus:border-[#1B4696] resize-none"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>
              </div>

              {/* Right Column: Payment */}
              <div className="space-y-5">
                {/* Payment Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200 h-full">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Application Fee Payment
                  </h3>

                  <div className="space-y-4">
                    {/* QR Code Section */}
                    <div className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs font-semibold text-slate-700 mb-2">Scan QR Code to Pay</p>

                      <Image
                        src="/driehoek-qrcode.png"
                        alt="Payment QR Code"
                        width={300}
                        height={300}
                        className="object-contain h-80 mx-auto"
                      />
                      <p className="text-xs text-slate-600 font-medium ">Amount: <span className="text-base font-bold text-green-600">₹500</span></p>
                    </div>

                    {/* Payment Receipt Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Payment Receipt Upload *
                      </label>
                      <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center bg-white">
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
                          className="cursor-pointer flex flex-col items-center justify-center gap-2"
                        >
                          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div className="text-left">
                            <p className="text-sm text-slate-600 font-medium line-clamp-1">
                              {formData.paymentReceipt ? formData.paymentReceipt.name : 'Upload Receipt'}
                            </p>
                            <p className="text-[10px] text-slate-500">JPG, PNG, PDF</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-slate-100 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1B4696] to-[#2FBDB9] text-white rounded-xl font-bold hover:shadow-lg hover:opacity-95 transition-all"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

