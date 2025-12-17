"use client";

import React, { useState } from "react";
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
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
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
          <form onSubmit={handleFormSubmit} className="space-y-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                rows={3}
                className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                placeholder="Tell us why you're interested in this position..."
              />
            </div>

            {/* Payment Section */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Application Fee Payment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* QR Code Section */}
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-xs font-semibold text-slate-700 mb-2">Scan QR Code to Pay</p>
                  <div className="bg-slate-100 w-36 h-36 mx-auto rounded-lg flex items-center justify-center mb-2">
                    {/* Sample QR Code */}
                    <div className="w-32 h-32 bg-white p-2 rounded-lg border-2 border-slate-300">
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
                  <p className="text-xs text-slate-600 font-medium">Amount: <span className="text-base font-bold text-green-600">₹500</span></p>
                  <p className="text-xs text-slate-500">Processing Fee</p>
                </div>

                {/* Payment Receipt Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Payment Receipt Upload *
                  </label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center bg-white">
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
                      <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm text-slate-600 font-medium">
                        {formData.paymentReceipt ? formData.paymentReceipt.name : 'Upload Receipt'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">JPG, PNG, PDF</p>
                    </label>
                  </div>
                  <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Upload payment confirmation
                  </p>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#1B4696] to-[#2FBDB9] text-white rounded-lg font-medium hover:shadow-lg transition-all"
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

