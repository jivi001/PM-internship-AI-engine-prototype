// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const API_TIMEOUT = 10000; // 10 seconds

// Mock data for prototype
const mockUserData = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
  role: 'Product Management Intern',
  location: 'San Francisco, CA',
  bio: 'Passionate PM intern with experience in user research and data analysis. Looking for opportunities in fintech and healthcare.',
  skills: [
    { name: 'Product Strategy', level: 85, category: 'core' },
    { name: 'User Research', level: 90, category: 'core' },
    { name: 'Data Analysis', level: 75, category: 'technical' },
    { name: 'Figma', level: 80, category: 'technical' },
    { name: 'SQL', level: 70, category: 'technical' },
    { name: 'A/B Testing', level: 85, category: 'core' },
    { name: 'Agile/Scrum', level: 90, category: 'core' },
    { name: 'Wireframing', level: 85, category: 'technical' },
  ],
  experience: [
    {
      title: 'PM Intern',
      company: 'TechStartup Inc.',
      duration: '3 months',
      description: 'Led user research initiatives and improved onboarding flow'
    },
    {
      title: 'Product Analyst',
      company: 'DataCorp',
      duration: '6 months',
      description: 'Analyzed user behavior and created product roadmaps'
    }
  ],
  preferences: {
    industries: ['Fintech', 'Healthcare', 'EdTech'],
    workType: 'Remote',
    duration: '3-6 months',
    startDate: '2024-01-15'
  }
};

const mockMatchesData = [
  {
    id: '1',
    company: 'FinanceFlow',
    role: 'Product Management Intern',
    location: 'Remote',
    duration: '6 months',
    matchScore: 95,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
    description: 'Join our fintech team to revolutionize personal finance management.',
    requirements: ['Product Strategy', 'User Research', 'SQL'],
    benefits: ['Mentorship', 'Real projects', 'Full-time offer potential'],
    posted: '2 days ago',
    status: 'pending'
  },
  {
    id: '2',
    company: 'HealthTech Solutions',
    role: 'Junior Product Manager',
    location: 'San Francisco, CA',
    duration: '4 months',
    matchScore: 88,
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100',
    description: 'Work on healthcare solutions that impact millions of patients.',
    requirements: ['Data Analysis', 'A/B Testing', 'Agile/Scrum'],
    benefits: ['Healthcare benefits', 'Learning budget', 'Flexible hours'],
    posted: '1 week ago',
    status: 'applied'
  },
  {
    id: '3',
    company: 'EduInnovate',
    role: 'Product Intern - Mobile',
    location: 'New York, NY',
    duration: '3 months',
    matchScore: 82,
    logo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100',
    description: 'Shape the future of online education with cutting-edge mobile apps.',
    requirements: ['Figma', 'User Research', 'Wireframing'],
    benefits: ['Remote work', 'Conference attendance', 'Certification programs'],
    posted: '3 days ago',
    status: 'new'
  }
];

const mockStatsData = {
  totalApplications: 12,
  pendingReviews: 5,
  interviews: 3,
  offers: 1,
  profileViews: 45,
  skillsMatched: 8,
  responseRate: 75,
  avgMatchScore: 87
};

const mockNotifications = [
  {
    id: '1',
    type: 'match',
    title: 'New Match Found!',
    message: 'You have a 95% match with FinanceFlow for PM Intern role.',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'application',
    title: 'Application Viewed',
    message: 'HealthTech Solutions viewed your application.',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: '3',
    type: 'interview',
    title: 'Interview Scheduled',
    message: 'Interview with EduInnovate scheduled for tomorrow at 2 PM.',
    timestamp: '2 days ago',
    read: true
  }
];

// API Helper Functions
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function apiCall(endpoint, options = {}) {
  // Simulate network delay for realistic feel
  await delay(Math.random() * 1000 + 500);
  
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    // For prototype, we're simulating API calls
    // In production, uncomment the following lines:
    /*
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new APIError(`API Error: ${response.statusText}`, response.status);
    }
    
    return await response.json();
    */
    
    // Prototype simulation - remove in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, data: {} });
        } else {
          reject(new APIError('Network error', 500));
        }
      }, 800);
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408);
    }
    throw error;
  }
}

// Authentication API
export const auth = {
  login: async (email, password) => {
    await delay(1000);
    if (email === 'demo@example.com' && password === 'demo123') {
      return {
        success: true,
        token: 'mock-jwt-token',
        user: mockUserData
      };
    }
    throw new APIError('Invalid credentials', 401);
  },

  logout: async () => {
    await delay(300);
    return { success: true };
  },

  register: async (userData) => {
    await delay(1500);
    return {
      success: true,
      user: { ...mockUserData, ...userData }
    };
  },

  forgotPassword: async (email) => {
    await delay(1000);
    return { success: true, message: 'Password reset email sent' };
  },

  verifyToken: async (token) => {
    await delay(500);
    return { valid: true, user: mockUserData };
  }
};

// User API
export const user = {
  getProfile: async (userId) => {
    await delay(800);
    return { success: true, data: mockUserData };
  },

  updateProfile: async (userId, updateData) => {
    await delay(1200);
    return {
      success: true,
      data: { ...mockUserData, ...updateData }
    };
  },

  uploadAvatar: async (userId, file) => {
    await delay(2000);
    return {
      success: true,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    };
  },

  updateSkills: async (userId, skills) => {
    await delay(1000);
    return {
      success: true,
      data: { ...mockUserData, skills }
    };
  }
};

// Matching API
export const matching = {
  getMatches: async (userId, filters = {}) => {
    await delay(1200);
    let matches = [...mockMatchesData];
    
    // Apply filters (mock implementation)
    if (filters.location) {
      matches = matches.filter(match => 
        match.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.minScore) {
      matches = matches.filter(match => match.matchScore >= filters.minScore);
    }
    
    return { success: true, data: matches };
  },

  getMatchDetails: async (matchId) => {
    await delay(600);
    const match = mockMatchesData.find(m => m.id === matchId);
    if (!match) {
      throw new APIError('Match not found', 404);
    }
    return { success: true, data: match };
  },

  applyToMatch: async (matchId, applicationData) => {
    await delay(1500);
    return {
      success: true,
      applicationId: `app_${Date.now()}`,
      message: 'Application submitted successfully'
    };
  },

  saveMatch: async (matchId) => {
    await delay(500);
    return { success: true, message: 'Match saved' };
  },

  rejectMatch: async (matchId, reason) => {
    await delay(500);
    return { success: true, message: 'Match rejected' };
  }
};

// Analytics API
export const analytics = {
  getStats: async (userId) => {
    await delay(1000);
    return { success: true, data: mockStatsData };
  },

  getMatchingTrends: async (userId, timeRange = '30d') => {
    await delay(800);
    return {
      success: true,
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        matches: [5, 8, 12, 15],
        applications: [2, 4, 7, 8],
        interviews: [0, 1, 2, 3]
      }
    };
  },

  getSkillsAnalysis: async (userId) => {
    await delay(600);
    return {
      success: true,
      data: {
        strengths: ['User Research', 'Agile/Scrum', 'A/B Testing'],
        improvements: ['SQL', 'Data Analysis', 'Technical Writing'],
        trending: ['Product Analytics', 'Growth Hacking', 'AI/ML Basics']
      }
    };
  }
};

// Notifications API
export const notifications = {
  getNotifications: async (userId) => {
    await delay(500);
    return { success: true, data: mockNotifications };
  },

  markAsRead: async (notificationId) => {
    await delay(300);
    return { success: true };
  },

  markAllAsRead: async (userId) => {
    await delay(500);
    return { success: true };
  },

  updatePreferences: async (userId, preferences) => {
    await delay(700);
    return { success: true, data: preferences };
  }
};

// Search API
export const search = {
  searchInternships: async (query, filters = {}) => {
    await delay(900);
    return {
      success: true,
      data: {
        results: mockMatchesData.filter(match =>
          match.role.toLowerCase().includes(query.toLowerCase()) ||
          match.company.toLowerCase().includes(query.toLowerCase())
        ),
        total: 25,
        page: 1,
        limit: 10
      }
    };
  },

  getFilters: async () => {
    await delay(400);
    return {
      success: true,
      data: {
        locations: ['Remote', 'San Francisco', 'New York', 'Seattle', 'Austin'],
        industries: ['Fintech', 'Healthcare', 'EdTech', 'E-commerce', 'AI/ML'],
        durations: ['1-3 months', '3-6 months', '6-12 months'],
        workTypes: ['Remote', 'Hybrid', 'On-site']
      }
    };
  }
};

// Error handling utility
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  if (error instanceof APIError) {
    return {
      message: error.message,
      status: error.status,
      isNetworkError: false
    };
  }
  
  return {
    message: 'Something went wrong. Please try again.',
    status: 500,
    isNetworkError: true
  };
};

// Request interceptor for adding auth tokens
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Utility functions for connecting to real FastAPI backend
export const connectToBackend = {
  // Replace these placeholder functions with real API calls
  
  updateBaseURL: (newURL) => {
    API_BASE_URL = newURL;
  },
  
  // Example of how to convert placeholder to real API call:
  realGetMatches: async (userId, filters = {}) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/matches/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Add query parameters for filters
      // params: new URLSearchParams(filters)
    });
    
    if (!response.ok) {
      throw new APIError(`Failed to fetch matches: ${response.statusText}`, response.status);
    }
    
    return await response.json();
  },
  
  // Machine Learning Integration endpoints
  mlEndpoints: {
    getSkillMatching: async (userSkills, jobRequirements) => {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/ml/skill-matching`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_skills: userSkills,
          job_requirements: jobRequirements
        })
      });
      return await response.json();
    },
    
    getRecommendations: async (userId) => {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/ml/recommendations/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      return await response.json();
    },
    
    optimizeMatching: async (preferences) => {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/ml/optimize-matching`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences)
      });
      return await response.json();
    }
  },
  
  // Firebase integration helpers
  firebase: {
    // Real-time data sync
    syncUserData: async (userId, data) => {
      // Implementation for Firebase real-time database sync
      console.log('Syncing user data to Firebase:', userId, data);
    },
    
    // File uploads to Firebase Storage
    uploadFile: async (file, path) => {
      // Implementation for Firebase Storage upload
      console.log('Uploading file to Firebase Storage:', file, path);
    }
  }
};

export default {
  auth,
  user,
  matching,
  analytics,
  notifications,
  search,
  handleAPIError,
  setAuthToken,
  getAuthToken,
  connectToBackend
};