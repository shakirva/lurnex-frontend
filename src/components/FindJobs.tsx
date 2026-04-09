"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiService, Job } from "@/lib/api";
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";

const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
const categories = ['All', "Development", "Design", "Marketing", "Sales", "Management", "Finance", "Customer Service", "Healthcare", "Education", "Engineering"];

export default function FindJobs() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQueryParam = searchParams.get('search');
  const locationParam = searchParams.get('location');
  
  const [searchTerm, setSearchTerm] = useState(searchQueryParam || "");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(locationParam || "");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [sortBy, setSortBy] = useState("newest");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    fetchJobs(1, true);
  }, [searchTerm, selectedType, selectedLocation, selectedCategory]);

  const fetchJobs = async (pageToFetch: number = 1, isInitial: boolean = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const params: any = {
        page: pageToFetch,
        limit: 10
      };
      if (searchTerm) params.search = searchTerm;
      if (selectedType !== "All") params.type = selectedType;
      if (selectedLocation !== "All") params.location = selectedLocation;
      if (selectedCategory !== "All") params.category = selectedCategory;

      const response = await apiService.getJobs(params);
      
      if (response.success && response.data) {
        if (isInitial) {
          setJobs(response.data);
        } else {
          setJobs(prev => [...prev, ...(response.data || [])]);
        }
        
        // If we got fewer results than the limit, there are no more jobs
        if (response.data.length < 10) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        setError(response.message || 'Failed to fetch jobs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchJobs(nextPage, false);
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "salary-high":
        return (parseInt(b.salary || "0") || 0) - (parseInt(a.salary || "0") || 0);
      case "salary-low":
        return (parseInt(a.salary || "0") || 0) - (parseInt(b.salary || "0") || 0);
      default:
        return 0;
    }
  });

  const filteredJobs = sortedJobs.filter(job => {
    // Search filter
    const matchesSearch = searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    // Type filter
    const matchesType = selectedType === "All" || job.type === selectedType;
    // Location filter
    const matchesLocation = selectedLocation === "" || selectedLocation === "All" || 
      (job.location && job.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    // Category filter
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory || job.category_name === selectedCategory;
    
    return matchesSearch && matchesType && matchesLocation && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Find Your <span className="bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] bg-clip-text text-transparent">Dream Job</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover thousands of job opportunities from top companies worldwide. 
            Your next career move starts here.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Search and Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 sticky top-32">
              {/* Search Bar */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Search Jobs</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] text-slate-700 placeholder-slate-400 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Filters Section */}
              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Filters</h3>
                
                <div className="space-y-6">
                {/* Job Type Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Job Type</label>
                  <div className="relative">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] bg-white text-slate-700 font-medium appearance-none cursor-pointer"
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Category</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] bg-white text-slate-700 font-medium appearance-none cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g., Dubai, Sharjah..."
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] bg-white text-slate-700 placeholder-slate-400 font-medium"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Sort Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Sort By</label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1B4696]/20 focus:border-[#1B4696] bg-white text-slate-700 font-medium appearance-none cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="salary-high">Salary: High to Low</option>
                      <option value="salary-low">Salary: Low to High</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                  {/* Clear Filters Button */}
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("All");
                      setSelectedLocation("");
                      setSelectedCategory("All");
                    }}
                    className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4696] mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading jobs...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Error loading jobs</h3>
                <p className="text-slate-600 mb-6">{error}</p>
                <button 
                  onClick={() => fetchJobs(1, true)}
                  className="px-6 py-3 bg-[#1B4696] text-white rounded-lg font-medium hover:bg-[#1B4696]/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Job Content */}
            {!loading && !error && (
              <>
                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-slate-600">
                    Showing <span className="font-semibold text-slate-900">{filteredJobs.length}</span> jobs
                  </p>
                </div>

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && filteredJobs.length > 0 && (
                  <div className="text-center mt-12 pb-12">
                    <button 
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className={`px-12 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center gap-3 mx-auto ${loadingMore ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Indexing...
                        </>
                      ) : (
                        'Explore More Opportunities'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your search criteria or filters</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("All");
                    setSelectedLocation("All");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-2 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] text-white rounded-lg font-medium hover:opacity-90 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
