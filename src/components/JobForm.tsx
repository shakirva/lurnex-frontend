"use client";

import React, { useState, useEffect } from "react";
import { type Job } from "@/lib/api";

interface JobFormProps {
  job?: Job | null;
  onSubmit: (jobData: any) => void;
  onClose: () => void;
}

export default function JobForm({ job, onSubmit, onClose }: JobFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    posted: '',
    description: '',
    requirements: [] as string[],
    logo: '',
    category: 'General',
    foodAccommodation: '',
    gender: ''
  });

  const [requirementInput, setRequirementInput] = useState('');

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title ?? '',
        company: job.company ?? '',
        location: job.location ?? '',
        type: job.type ?? 'Full-time',
        salary: job.salary ?? '',
        posted: job.posted ?? '',
        description: job.description ?? '',
        requirements: job.requirements ?? [],
        logo: job.logo ?? '',
        category: job.category ?? 'General',
        foodAccommodation: job.foodAccommodation ?? '',
        gender: job.gender ?? ''
      });
      // Set requirements input as comma-separated string for editing
      setRequirementInput((job.requirements ?? []).join(', '));
    } else {
      // Set default posted date for new jobs
      setFormData(prev => ({
        ...prev,
        posted: 'Just now'
      }));
    }
  }, [job]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert requirements string to array
    const requirementsArray = requirementInput
      .split(',')
      .map(req => req.trim())
      .filter(req => req.length > 0);
    
    onSubmit({
      ...formData,
      requirements: requirementsArray.length > 0 ? requirementsArray : ['No specific requirements'],
      logo: 'https://via.placeholder.com/60' // Default placeholder logo
    });
  };

  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Contract'];
  const categories = ['Development', 'Design', 'Marketing', 'Management', 'Sales', 'Support', 'Other'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {job ? 'Edit Job' : 'Create New Job'}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Company Type *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                  placeholder="e.g., IT Company, Educational Institution, Healthcare"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                  placeholder="e.g., New York, NY"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Salary Range *
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                placeholder="e.g., $80,000 - $120,000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                placeholder="Describe the job responsibilities, requirements, and what the candidate will be doing..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Requirements *
              </label>
              <textarea
                name="requirementInput"
                value={requirementInput}
                onChange={(e) => setRequirementInput(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                placeholder="Enter job requirements (e.g., 3+ years experience in React, TypeScript, Next.js)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Food/Accommodation
                </label>
                <select
                  name="foodAccommodation"
                  value={formData.foodAccommodation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                >
                  <option value="">Select Option</option>
                  <option value="Provided">Provided</option>
                  <option value="Not Provided">Not Provided</option>
                  <option value="Negotiable">Negotiable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696]"
                >
                  <option value="">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Male/Female">Male/Female</option>
                </select>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-lg font-medium hover:opacity-90 transition-all"
              >
                {job ? 'Update Job' : 'Create Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
