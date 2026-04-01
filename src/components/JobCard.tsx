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
    <div className="group relative bg-white rounded-lg border border-slate-200 hover:border-[#1B4696] hover:shadow-lg transition-all duration-300 p-6 flex flex-col h-full">
      <div className="mb-6">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1B4696] transition-colors line-clamp-2 flex-1">
            {job.title}
          </h3>
          <span className="shrink-0 bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1.5 rounded uppercase tracking-wider shadow-sm">
            {job.type || 'FULL-TIME'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <span>Location: {job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{job.posted || 'Recently'}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-[110px_1fr] gap-y-2.5 text-sm mb-8 flex-1">
        <span className="font-bold text-slate-800 uppercase tracking-tight">Job ID</span>
        <span className="text-slate-500">{job.id}</span>

        <span className="font-bold text-slate-800 uppercase tracking-tight">Company</span>
        <span className={`line-clamp-1 ${job.is_masked ? 'text-slate-400 font-medium italic' : 'text-slate-500'}`}>
          {job.is_masked ? (
            <span className="flex items-center gap-1.5 pt-0.5">
              <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              {job.company}
            </span>
          ) : job.company}
        </span>

        <span className="font-bold text-slate-800 uppercase tracking-tight">Food & Acco</span>
        <span className="text-slate-500 uppercase">{job.foodAccommodation === 'Provided' ? 'YES' : job.foodAccommodation === 'Not Provided' ? 'NO' : (job.foodAccommodation || 'NO')}</span>

        <span className="font-bold text-slate-800 uppercase tracking-tight">Gender</span>
        <span className="text-slate-500">{job.gender || 'Any'}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto">
        {job.is_masked ? (
          <Link
            href="/subscription"
            className="flex-[2] bg-slate-900 border border-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-md font-bold text-sm text-center transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Unlock to Apply
          </Link>
        ) : (
          <button
            onClick={() => setShowApplicationForm(true)}
            className="flex-[2] bg-[#1B4696] cursor-pointer hover:bg-[#153a7a] text-white py-2.5 px-4 rounded-md font-bold text-sm transition-colors duration-200 shadow-sm"
          >
            Apply Now
          </button>
        )}
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 px-4 rounded-md font-semibold text-sm text-center transition-colors duration-200"
        >
          Details
        </Link>
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

