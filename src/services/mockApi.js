import { mockUser, mockCarbonData, mockSentimentData, activityCategories } from '../data/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // Auth services
  login: async (email, password) => {
    await delay(1000);
    if (email === 'john@example.com' && password === 'password') {
      return { success: true, user: mockUser, token: 'mock-jwt-token' };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  signup: async (userData) => {
    await delay(1000);
    return { 
      success: true, 
      user: { ...mockUser, ...userData, id: Date.now() },
      token: 'mock-jwt-token' 
    };
  },

  // Data fetching
  getCarbonData: async (startDate, endDate) => {
    await delay(500);
    return { success: true, data: mockCarbonData };
  },

  getSentimentData: async (startDate, endDate) => {
    await delay(500);
    return { success: true, data: mockSentimentData };
  },

  getActivityCategories: async () => {
    await delay(200);
    return { success: true, data: activityCategories };
  },

  // Data submission
  logActivity: async (activityData) => {
    await delay(800);
    console.log('Logging activity:', activityData);
    return { success: true, message: 'Activity logged successfully' };
  },

  logReflection: async (reflectionData) => {
    await delay(600);
    console.log('Logging reflection:', reflectionData);
    return { success: true, message: 'Reflection saved successfully' };
  }
};