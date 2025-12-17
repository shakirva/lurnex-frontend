"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { apiService, Job } from "@/lib/api";
import { mockJobs } from "@/data/jobs";
import JobCard from "./JobCard";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await apiService.getJobs();
      if (response.success && response.data) {
        setJobs(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  // Get first 6 jobs for display
  const featuredJobs = jobs.slice(0, 6);
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-0 bg-[#F1F4FB] min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center h-full">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Find a job that suits your interest & skills.
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Aliquam vitae turpis in diam convallis finibus in at risus. Nullam 
                in scelerisque leo, eget sollicitudin velit bestibulum.
              </p>
              
              {/* Search Form */}
              <div className="bg-white rounded-md p-4 border border-slate-200 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Job Title Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Job title, keyword..."
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4696] focus:border-transparent text-slate-700 placeholder-slate-400"
                    />
                  </div>
                  
                  {/* Location Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Your Location"
                      className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4696] focus:border-transparent text-slate-700 placeholder-slate-400"
                    />
                  </div>
                  
                  {/* Find Job Button */}
                  <button className="px-8 py-4 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-md font-semibold hover:opacity-90 transition-all whitespace-nowrap shadow-lg hover:shadow-xl">
                    Find Job
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="text-left">
                <p className="text-sm text-slate-500 mb-2">Suggestion:</p>
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-colors">
                    Designer
                  </a>
                  <a href="#" className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-colors">
                    Programming
                  </a>
                  <a href="#" className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-colors">
                    Digital Marketing
                  </a>
                  <a href="#" className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-colors">
                    Video
                  </a>
                  <a href="#" className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-sm hover:bg-gradient-to-tr hover:from-[#1B4696] hover:to-[#2FBDB9] hover:text-white transition-colors">
                    Animation
                  </a>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:flex justify-center items-end relative h-full">
              <div className="relative w-full max-w-md">
                {/* Professional Image */}
                <div className=" h-[620px] mx-auto relative overflow-hidden">
                  <Image
                    src="/hero-img.png"
                    alt="Professional looking for job opportunities"
                    fill
                    className="object-cover object-bottom"
                    priority
                  />
                </div>

                {/* Work Inquiry Card */}
                <div className="absolute top-2 -right-8 bg-white rounded-lg p-4 shadow-xl border border-slate-200 animate-[float_4s_ease-in-out_infinite]">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600">Work Inquiry From</div>
                      <div className="font-bold text-slate-900">Ali Tufan</div>
                    </div>
                  </div>
                </div>

                {/* Candidates Card */}
                <div className="absolute bottom-24 -left-12 bg-white rounded-xl p-5 shadow-2xl border border-slate-200 animate-[float_5s_ease-in-out_infinite_0.5s] min-w-[220px]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                    
                      <div>
                        <div className="text-sm font-semibold text-slate-800">10k+ Candidates</div>
                        <div className="text-xs text-slate-500 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          Active Now
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Avatar Stack */}
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                          alt="Candidate 1"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-8 h-8 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                          alt="Candidate 2"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-8 h-8 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                          alt="Candidate 3"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                      <span className="text-xs text-white font-bold">+</span>
                    </div>
                    </div>
                   
                    <div className="text-xs text-slate-500 font-medium">
                      +9,997 more
                    </div>
                  </div>
                  
                </div>

                {/* Creative Agency Card */}
                <div className="absolute bottom-8 -right-12 bg-white rounded-xl p-5 shadow-2xl border border-slate-200 animate-[float_6s_ease-in-out_infinite_1s] min-w-[200px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">Creative Agency</div>
                        <div className="text-xs text-slate-500 flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          Startup
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">Project Progress</span>
                      <span className="text-xs font-medium text-slate-800">75%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Job Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Job Categories</h2>
            <p className="text-slate-600">{mockJobs.length} jobs live</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Set(mockJobs.map(job => job.category))).map(category => {
              const jobsInCategory = mockJobs.filter(job => job.category === category);
              return (
                <div key={category} className="bg-white rounded-2xl p-8 border border-slate-100 relative overflow-hidden cursor-pointer">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-tr from-[#1B4696]/10 to-[#2FBDB9]/10 rounded-2xl flex items-center justify-center mb-4">
                      {/* You can customize SVG/icon per category if needed */}
                      <svg className="w-8 h-8 text-[#1B4696]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="#1B4696" strokeWidth="2" fill="none" />
                        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#1B4696">{category[0]}</text>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{category}</h3>
                    <p className="text-slate-500 text-sm font-medium">({jobsInCategory.length} open positions)</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Job Openings Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Latest Job Openings in India – Kerala
            </h2>
            <p className="text-slate-600">Lorem ipsum dolor sit amet elit, sed do eiusmod tempor</p>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Millions of Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="bg-slate-100 rounded-lg p-8 relative overflow-hidden">
                {/* About Image */}
                <div className="relative z-10">
                  <div className="w-full h-80 rounded-lg overflow-hidden">
                    <Image
                      src="/about-img.png"
                      alt="About us - Professional team working together"
                      width={400}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute z-10 bottom-4 right-4 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-full w-12 h-12 flex items-center justify-center animate-bounce">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Millions of Jobs. Find the one that suits you.
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Bring to the table win-win survival</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">Capitalize on low hanging fruit to identify</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700">But I must explain to you how all this</span>
                </div>
              </div>

              <button className="bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all">
                Get Started
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">4M</div>
              <p className="text-slate-600">4 million daily active users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">12k</div>
              <p className="text-slate-600">Over 12k open job positions</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-2">20M</div>
              <p className="text-slate-600">Over 20 million stories shared</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
