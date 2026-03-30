"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { type Job, apiService } from "@/lib/api";
import JobForm from "./JobForm";
import {
  FaBriefcase,
  FaCheckCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBan,
  FaFileAlt,
  FaCreditCard
} from "react-icons/fa";



export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'messages' | 'employers' | 'candidates'>('jobs');

  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [employers, setEmployers] = useState<any[]>([]);
  const [loadingEmployers, setLoadingEmployers] = useState(false);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userRoleForModal, setUserRoleForModal] = useState<'employer' | 'user'>('employer');
  const [selectedUserForSub, setSelectedUserForSub] = useState<any>(null);


  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isSubmittingSub, setIsSubmittingSub] = useState(false);

  useEffect(() => {
    fetchJobs();

    fetchContactMessages();
    fetchEmployers();
    fetchCandidates();
  }, []);



  useEffect(() => {
    if (activeTab === 'messages') {
      fetchContactMessages();
    }
    if (activeTab === 'employers') {
      fetchEmployers();
    }
    if (activeTab === 'candidates') {
      fetchCandidates();
    }
  }, [activeTab]);


  const fetchContactMessages = async () => {
    setLoadingMessages(true);
    try {
      const response = await apiService.getContactMessages({ page: 1, limit: 50 });
      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          setContactMessages(response.data);
        } else if (response.data && Array.isArray((response.data as any).messages)) {
          setContactMessages((response.data as any).messages);
        } else {
          setContactMessages([]);
        }
      } else {
        setContactMessages([]);
      }
    } catch (err) {
      setContactMessages([]);
    }
    setLoadingMessages(false);
  };

  const fetchEmployers = async () => {
    setLoadingEmployers(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/employers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployers(data.data || data || []);
      } else {
        setEmployers([]);
      }
    } catch {
      setEmployers([]);
    }
    setLoadingEmployers(false);
  };

  const fetchCandidates = async () => {
    setLoadingCandidates(true);
    try {
      const response = await apiService.getCandidates();
      if (response.success && response.data) {
        setCandidates(response.data);
      } else {
        setCandidates([]);
      }
    } catch {
      setCandidates([]);
    }
    setLoadingCandidates(false);
  };


  const handleUserStatusUpdate = async (userId: number, currentStatus: boolean, type: 'employer' | 'candidate') => {
    const action = currentStatus ? 'deactivate' : 'activate';
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const response = await apiService.updateUserStatus(userId, !currentStatus);
        if (response.success) {
          if (type === 'employer') fetchEmployers();
          else fetchCandidates();
        }
      } catch (err) {
        console.error('Status update failed:', err);
      }
    }
  };

  const handleDeleteUser = async (userId: number, type: 'employer' | 'candidate') => {
    if (confirm('CRITICAL: This will permanently delete the user and all associated data. Continue?')) {
      try {
        const response = await apiService.deleteUser(userId);
        if (response.success) {
          if (type === 'employer') fetchEmployers();
          else fetchCandidates();
        }
      } catch (err) {
        console.error('Deletion failed:', err);
      }
    }
  };


  const fetchJobs = async () => {
    try {
      const response = await apiService.getJobs();
      if (response.success && Array.isArray(response.data)) {
        setJobs(response.data);
      }
    } catch (err) {
      setJobs([]);
    }
  };

  const handleCreateJob = async (jobData: any) => {
    try {
      const response = await apiService.createJob(jobData);
      if (response.success) {
        await fetchJobs();
        setShowJobForm(false);
      } else {
        setError(response.message || 'Failed to create job');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job');
    }
    setShowJobForm(false);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleUpdateJob = async (jobData: any) => {
    if (editingJob) {
      try {
        const response = await apiService.updateJob(editingJob.id, jobData);
        if (response.success) {
          await fetchJobs();
          setEditingJob(null);
          setShowJobForm(false);
        } else {
          setError(response.message || 'Failed to update job');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update job');
      }
    }
  };

  const handleDeleteJob = async (jobId: number) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await apiService.deleteJob(jobId);
        if (response.success) {
          await fetchJobs();
        } else {
          setError(response.message || 'Failed to delete job');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete job');
      }
    }
  };

  const handleCloseForm = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleEnableSubscription = async () => {
    if (!selectedUserForSub) return;

    setIsSubmittingSub(true);
    try {
      const response = await apiService.enableSubscription(selectedUserForSub.id, selectedPlan);
      if (response.success) {
        alert(`Subscription enabled for ${selectedUserForSub.username}`);
        setShowSubscriptionModal(false);
        if (activeTab === 'employers') fetchEmployers();
        else if (activeTab === 'candidates') fetchCandidates();
      } else {
        setError(response.message || 'Failed to enable subscription');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enable subscription');
    } finally {
      setIsSubmittingSub(false);
    }
  };



  const handleRegisterUser = async (userData: any) => {
    try {
      const response = await apiService.createUserAdmin(userData);
      if (response.success) {
        alert('User registered successfully');
        setShowUserModal(false);
        if (userData.role === 'employer') fetchEmployers();
        else fetchCandidates();
      } else {
        setError(response.message || 'Failed to register user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register user');
    }
  };

  const handleLogout = () => {

    logout();
    router.push('/admin/login');
  };


  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">Welcome back, {(user?.first_name || user?.username || 'Admin')}! Manage job vacancies and applications</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center py-6">
            <FaBriefcase className="w-8 h-8 text-[#1B4696] mb-2" />
            <div className="text-2xl font-bold text-slate-900">{jobs.length}</div>
            <div className="text-slate-500">Total Jobs</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center py-6">
            <FaFileAlt className="w-8 h-8 text-[#F59E42] mb-2" />
            <div className="text-2xl font-bold text-slate-900">{contactMessages.length}</div>
            <div className="text-slate-500">Total Messages</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'jobs'
                  ? 'border-[#1B4696] text-[#1B4696]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                Job Vacancies
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'messages'
                  ? 'border-[#1B4696] text-[#1B4696]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab('employers')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'employers'
                  ? 'border-[#1B4696] text-[#1B4696]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                Employers
              </button>
              <button
                onClick={() => setActiveTab('candidates')}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'candidates'
                  ? 'border-[#1B4696] text-[#1B4696]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
              >
                Candidates
              </button>
            </div>
          </div>
        </div>


        {/* Tab Content */}
        {activeTab === 'messages' && (
          <div className="flex justify-center w-full mt-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 w-full mx-auto">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900">Contact Messages</h2>
              </div>
              <div className="overflow-x-auto">
                {loadingMessages ? (
                  <div className="p-8 text-center text-slate-500">Loading...</div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {contactMessages.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No messages found.</td>
                        </tr>
                      ) : (
                        contactMessages.map((msg: any) => (
                          <tr key={msg.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{msg.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{msg.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{msg.subject}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{msg.created_at}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Jobs Table */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Job Vacancies</h2>
              <button
                onClick={() => setShowJobForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Add Job
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Posted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{job.title}</div>
                        <div className="text-sm text-slate-500">{job.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{job.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{job.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                          job.type === 'Remote' ? 'bg-blue-100 text-blue-800' :
                            job.type === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
                              job.type === 'Contract' ? 'bg-purple-100 text-purple-800' :
                                job.type === 'Internship' ? 'bg-pink-100 text-pink-800' :
                                  'bg-gray-100 text-gray-800'
                          }`}>
                          {job.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{job.posted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditJob(job)}
                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          >
                            <FaEdit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <FaTrash className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* Employer Details */}
        {activeTab === 'employers' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Registered Employers</h2>
                <p className="text-sm text-slate-500 mt-0.5">View details of all employer accounts</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-500">{employers.length} total</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loadingEmployers ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : employers.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-slate-400">No employers have registered yet.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Identify</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Organization & Contact</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-3 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Jobs</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-slate-200">
                    {employers.map((emp: any) => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{emp.first_name} {emp.last_name}</span>
                              <span className="text-xs text-slate-500">@{emp.username}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div className="font-medium text-slate-900">{emp.company_name || '—'}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{emp.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${emp.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}>
                            {emp.is_active ? '● Active' : '○ Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{emp.job_posted_count || 0}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUserStatusUpdate(emp.id, emp.is_active, 'employer')}
                              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${emp.is_active
                                ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
                                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                                }`}
                              title={emp.is_active ? "Deactivate Account" : "Activate Account"}
                            >
                              {emp.is_active ? <FaBan className="w-4 h-4" /> : <FaCheckCircle className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(emp.id, 'employer')}
                              className="w-9 h-9 flex items-center justify-center border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                              title="Delete Permanently"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              )}
            </div>
          </div>
        )}

        {/* Candidate Details */}
        {activeTab === 'candidates' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Registered Candidates</h2>
                <p className="text-sm text-slate-500 mt-0.5">View and manage job seeker subscriptions</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-500">{candidates.length} total</span>
                <button
                  onClick={() => {
                    setUserRoleForModal('user');
                    setShowUserModal(true);
                  }}
                  className="bg-[#2FBDB9] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#28a7a4] transition-colors flex items-center gap-2"
                >
                  <FaPlus className="w-3 h-3" />
                  Register Candidate
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loadingCandidates ? (
                <div className="p-8 text-center text-slate-500">Loading...</div>
              ) : candidates.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-slate-400">No candidates have registered yet.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Job Seeker</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Plan & Experience</th>
                      <th className="px-6 py-3 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Applications</th>
                      <th className="px-6 py-3 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>



                  <tbody className="bg-white divide-y divide-slate-200">
                    {candidates.map((cand: any) => (
                      <tr key={cand.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{cand.first_name} {cand.last_name}</span>
                              <span className="text-xs text-slate-500">@{cand.username}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">
                          <div className="text-slate-900 font-medium">{cand.email}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{cand.phone || 'No phone provided'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${cand.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                            }`}>
                            {cand.is_active ? '● Active' : '○ Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-3">
                            {cand.plan_name ? (
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#1B4696] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                                  {cand.plan_name}
                                  <span className=" ml-1.5 opacity-80">({new Date(cand.plan_expires_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()})</span>
                                </span>
                              </div>
                            ) : (
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100 w-fit">Free Account</span>
                            )}

                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">

                          <span className="text-sm font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full">{cand.application_count || 0}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedUserForSub(cand);
                                setShowSubscriptionModal(true);
                              }}
                              className="whitespace-nowrap flex items-center gap-2 px-3 py-1.5 bg-[#1B4696] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-700 transition-all shadow-sm shadow-blue-200"
                            >
                              <FaCreditCard className="w-3 h-3" />
                              Sub
                            </button>
                            <button
                              onClick={() => handleUserStatusUpdate(cand.id, cand.is_active, 'candidate')}
                              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${cand.is_active
                                ? 'border-orange-200 text-orange-600 hover:bg-orange-50'
                                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                                }`}
                              title={cand.is_active ? "Deactivate Job Seeker" : "Activate Job Seeker"}
                            >
                              {cand.is_active ? <FaBan className="w-4 h-4" /> : <FaCheckCircle className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(cand.id, 'candidate')}
                              className="w-9 h-9 flex items-center justify-center border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                              title="Delete Account"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <JobForm
          job={editingJob}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
          onClose={handleCloseForm}
        />
      )}

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Enable Subscription</h3>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-1">Activating for</p>
                <p className="text-lg font-semibold text-[#1B4696]">
                  {selectedUserForSub?.first_name} {selectedUserForSub?.last_name}
                  <span className="text-slate-400 font-normal text-sm ml-2">(@{selectedUserForSub?.username})</span>
                </p>
              </div>


              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">Select Subscription Plan</label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'basic', name: 'Basic (3 Months)', price: '₹399' },
                    { id: 'standard', name: 'Standard (6 Months)', price: '₹599' },
                    { id: 'premium', name: 'Premium (1 Year)', price: '₹999' },
                    { id: 'accountant', name: 'Accountant (1 Year)', price: '₹3,999' },
                  ].map((plan) => (
                    <label
                      key={plan.id}
                      className={`relative flex items-center p-4 cursor-pointer border rounded-xl transition-all ${selectedPlan === plan.id
                        ? 'border-[#1B4696] bg-blue-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        className="w-4 h-4 text-[#1B4696] border-slate-300 focus:ring-[#1B4696]"
                        checked={selectedPlan === plan.id}
                        onChange={() => setSelectedPlan(plan.id)}
                      />
                      <div className="ml-4 flex justify-between w-full">
                        <span className="font-medium text-slate-900">{plan.name}</span>
                        <span className="text-[#1B4696] font-bold">{plan.price}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnableSubscription}
                  disabled={isSubmittingSub}
                  className="flex-1 px-4 py-2 bg-[#1B4696] text-white rounded-lg hover:bg-[#153a7a] transition-colors disabled:opacity-50"
                >
                  {isSubmittingSub ? 'Processing...' : 'Activate Now'}
                </button>
              </div>
              <p className="mt-4 text-xs text-center text-slate-400">
                This will record an offline payment and grant immediate access.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* User Registration Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">
                Register {userRoleForModal === 'employer' ? 'Employer' : 'Candidate'}
              </h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData.entries());
                handleRegisterUser({ ...data, role: userRoleForModal });
              }}
              className="p-6 space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">First Name</label>
                  <input name="first_name" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Last Name</label>
                  <input name="last_name" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Username</label>
                <input name="username" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                <input name="email" type="email" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</label>
                <input name="password" type="password" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
              </div>
              {userRoleForModal === 'employer' && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Company Name</label>
                  <input name="company_name" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
                </div>
              )}
              {userRoleForModal === 'user' && (
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Experience (Years)</label>
                  <input name="experience_years" type="number" min="0" required defaultValue="0" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>

                <input name="phone" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#1B4696] outline-none" placeholder="+91..." />
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1B4696] text-white rounded-lg hover:bg-[#153a7a] transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}
