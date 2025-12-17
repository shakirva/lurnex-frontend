"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { type Job, apiService } from "@/lib/api";
import JobForm from "./JobForm";
import { 
  FaBriefcase, 
  FaCheckCircle, 
  FaUsers, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaDownload,
  FaFileAlt
} from "react-icons/fa";

interface Application {
  id: number;
  jobId: number;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  appliedDate: string;
  resume: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  paymentFile?: string;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications' | 'messages'>('jobs');
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchContactMessages();
  }, []);

  useEffect(() => {
    if (activeTab === 'messages') {
      fetchContactMessages();
    }
  }, [activeTab]);
  // Fetch applications for stats and table
  const fetchApplications = async () => {
    try {
      const response = await apiService.getApplications();
      // If response.data is an object with applications property, use it
      if (response.success && response.data && typeof response.data === 'object' && 'applications' in response.data) {
        setApplications((response.data as any).applications);
      } else if (response.success && Array.isArray(response.data)) {
        setApplications(response.data);
      } else {
        setApplications([]);
      }
    } catch (err) {
      setApplications([]);
    }
  };

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
  }

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

  const handleUpdateJob = (jobData: Omit<Job, 'id'>) => {
    if (editingJob) {
      const updatedJob: Job = {
        ...jobData,
        id: editingJob.id
      };
      setJobs(jobs.map(j => j.id === editingJob.id ? updatedJob : j));
      setEditingJob(null);
      setShowJobForm(false);
    }
  };

  const handleDeleteJob = (jobId: number) => {
    if (confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(j => j.id !== jobId));
    }
  };

  const handleCloseForm = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const handleApplicationStatusChange = (applicationId: number, newStatus: Application['status']) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
              <FaUsers className="w-8 h-8 text-[#2FBDB9] mb-2" />
              <div className="text-2xl font-bold text-slate-900">{applications.length}</div>
              <div className="text-slate-500">Total Applications</div>
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
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'jobs'
                      ? 'border-[#1B4696] text-[#1B4696]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Job Vacancies
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'applications'
                      ? 'border-[#1B4696] text-[#1B4696]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'messages'
                      ? 'border-[#1B4696] text-[#1B4696]'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Messages
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
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

          {/* Applications Table */}
          {activeTab === 'applications' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-900">Job Applications</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[180px]">Candidate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[180px]">Job Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[180px]">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Applied</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[220px]">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[220px]">Cover Letter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Resume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider min-w-[120px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {applications.map((application) => (
                      <tr key={application.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-tr from-[#1B4696] to-[#2FBDB9] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {application.candidateName
                                ? application.candidateName.split(' ').map(n => n[0]).join('')
                                : 'NA'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">{application.candidateName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{application.jobTitle}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{application.email}</div>
                          <div className="text-sm text-slate-500">{application.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{application.appliedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {application.paymentFile ? (
                            <a
                              href={`http://localhost:5000/uploads/payments/${application.paymentFile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                            >
                              <FaDownload className="w-3 h-3" />
                              Download Payment
                            </a>
                          ) : (
                            <span className="text-slate-400">No Payment</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 max-w-xs truncate" title={application.coverLetter}>
                          {application.coverLetter ? application.coverLetter : <span className="text-slate-400">No cover letter</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {application.resume ? (
                            <a
                              href={`http://localhost:5000/uploads/resumes/${application.resume}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-900 flex items-center gap-1"
                            >
                              <FaDownload className="w-3 h-3" />
                              Download CV
                            </a>
                          ) : (
                            <span className="text-slate-400">No CV</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {/* Future actions: status change, delete, etc. */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    </div>
  );
}
