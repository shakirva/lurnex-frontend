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
      {/* Top Section */}
      <div className="mb-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1B4696] transition-colors pr-20 line-clamp-1">
            {job.title}
          </h3>
          <span className="absolute top-0 right-0 bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
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
        <span className="font-bold text-slate-800">JOB ID</span>
        <span className="text-slate-500">{job.id}</span>

        <span className="font-bold text-slate-800">Comp. Type</span>
        <span className="text-slate-500 line-clamp-1">{job.company}</span>

        <span className="font-bold text-slate-800">Food & Acco</span>
        <span className="text-slate-500 uppercase">{job.foodAccommodation === 'Provided' ? 'YES' : job.foodAccommodation === 'Not Provided' ? 'NO' : (job.foodAccommodation || 'NO')}</span>

        <span className="font-bold text-slate-800">Male / Female</span>
        <span className="text-slate-500">{job.gender || 'Any'}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={() => setShowApplicationForm(true)}
          className="flex-1 bg-[#1B4696] cursor-pointer hover:bg-[#153a7a] text-white py-2.5 px-4 rounded-md font-medium text-sm transition-colors duration-200 shadow-sm"
        >
          Apply Now
        </button>
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 bg-slate-100 cursor-pointer hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-md font-medium text-sm text-center transition-colors duration-200"
        >
          Job Details
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

