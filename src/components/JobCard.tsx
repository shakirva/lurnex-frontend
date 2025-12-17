"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type Job } from "@/lib/api";
import ApplicationFormModal from "./ApplicationFormModal";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#1B4696]/30 shadow-md hover:shadow-2xl transition-all duration-500">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B4696] via-[#2FBDB9] to-[#1B4696] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#1B4696]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#2FBDB9]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-6">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1B4696] transition-colors flex-1">
              {job.title}
            </h3>
            <span className="ml-2 px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md border border-slate-200">
              ID: {job.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Company Type:</span>
            <p className="text-sm font-semibold text-slate-600">{job.company}</p>
          </div>
        </div>

        {/* Job Type */}
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-sm">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            {job.type}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl">
          <svg className="w-5 h-5 text-[#1B4696]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-semibold text-slate-700">{job.location}</span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl border border-orange-100">
            <p className="text-xs text-orange-600 font-medium mb-1">Food/Acco</p>
            <p className="text-xs font-bold text-orange-900">{job.food_accommodation || 'N/A'}</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl border border-pink-100">
            <p className="text-xs text-pink-600 font-medium mb-1">Gender</p>
            <p className="text-xs font-bold text-pink-900">{job.gender || 'Any'}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-slate-400 font-medium">Quick Apply</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => setShowApplicationForm(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1B4696] to-[#2FBDB9] text-white py-3.5 px-4 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 group/btn"
          >
            <span>Apply Now</span>
            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <Link 
            href={`/jobs/${job.id}`}
            className="flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-all duration-200"
          >
            <span>Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Application Form Modal */}
      <ApplicationFormModal 
        job={job}
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
      />
    </div>
  );
}

