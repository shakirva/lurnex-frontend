// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Types from backend
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
  salary?: string;
  description: string;
  requirements: string[];
  logo?: string;
  category_name?: string;
  category?: string; // For compatibility with frontend components
  food_accommodation?: 'Provided' | 'Not Provided' | 'Partial';
  foodAccommodation?: string; // For compatibility with frontend components
  gender?: 'Male' | 'Female' | 'Any';
  posted?: string;
  created_at: string;
}

// Transform backend job to frontend-compatible format
export const transformJob = (backendJob: any): Job => ({
  ...backendJob,
  category: backendJob.category_name || backendJob.category || 'General',
  foodAccommodation: backendJob.food_accommodation || backendJob.foodAccommodation,
  posted: backendJob.created_at ? formatDate(backendJob.created_at) : 'Recently',
  requirements: typeof backendJob.requirements === 'string' 
    ? backendJob.requirements.split(',').map((req: string) => req.trim())
    : (backendJob.requirements || []),
  logo: backendJob.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(backendJob.company || 'Company')}&background=1B4696&color=fff&size=60`
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
};

export interface JobApplication {
  job_id: number;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  cover_letter?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'user';
  };
}

// API Helper Functions
class ApiService {
  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  }

  // Authentication APIs
  async login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    return this.handleResponse<LoginResponse>(response);
  }

  async logout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // Job APIs
  async getJobs(params?: {
    page?: number;
    limit?: number;
    category?: string;
    location?: string;
    type?: string;
    search?: string;
  }): Promise<ApiResponse<Job[]>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = queryParams.toString() 
      ? `${API_BASE_URL}/jobs?${queryParams}`
      : `${API_BASE_URL}/jobs`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    const result = await this.handleResponse<Job[]>(response);
    
    // Transform backend jobs to frontend-compatible format
    if (result.success && result.data) {
      result.data = result.data.map(transformJob);
    }
    
    return result;
  }

  async getJobById(id: number): Promise<ApiResponse<Job>> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      headers: this.getHeaders(),
    });

    const result = await this.handleResponse<Job>(response);
    
    // Transform backend job to frontend-compatible format
    if (result.success && result.data) {
      result.data = transformJob(result.data);
    }
    
    return result;
  }

  async getJobCategories(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${API_BASE_URL}/jobs/categories`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<any[]>(response);
  }

  async createJob(jobData: any): Promise<ApiResponse<Job>> {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(jobData),
    });

    return this.handleResponse<Job>(response);
  }

  async updateJob(id: number, jobData: any): Promise<ApiResponse<Job>> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(jobData),
    });

    return this.handleResponse<Job>(response);
  }

  async deleteJob(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // Job Application APIs
  async submitApplication(formData: FormData): Promise<ApiResponse> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {};
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse(response);
  }

  async getApplications(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const url = queryParams.toString() 
      ? `${API_BASE_URL}/applications?${queryParams}`
      : `${API_BASE_URL}/applications`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<any[]>(response);
  }

  async updateApplicationStatus(id: number, status: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ status }),
    });

    return this.handleResponse(response);
  }

  // Contact APIs
  async submitContact(contactData: ContactMessage): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });

    return this.handleResponse(response);
  }

  async getContactMessages(params?: {
    page?: number;
    limit?: number;
    unread?: boolean;
  }): Promise<ApiResponse<any[]>> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (typeof value === 'boolean') {
          if (!value) return; // only include when true
          queryParams.append(key, 'true');
          return;
        }
        queryParams.append(key, String(value));
      });
    }

    const url = queryParams.toString() 
      ? `${API_BASE_URL}/contact?${queryParams}`
      : `${API_BASE_URL}/contact`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    return this.handleResponse<any[]>(response);
  }

  async markMessageAsRead(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
      method: 'PUT',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // Health Check
  async healthCheck(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();