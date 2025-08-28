// Mock user data
export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  joinDate: "2024-01-15"
};

// Mock carbon footprint data (kg CO2 per day)
export const mockCarbonData = [
  { date: '2024-08-20', transport: 5.2, diet: 3.1, energy: 2.8, total: 11.1 },
  { date: '2024-08-21', transport: 3.8, diet: 2.9, energy: 3.2, total: 9.9 },
  { date: '2024-08-22', transport: 6.1, diet: 3.5, energy: 2.5, total: 12.1 },
  { date: '2024-08-23', transport: 2.3, diet: 2.8, energy: 3.0, total: 8.1 },
  { date: '2024-08-24', transport: 4.7, diet: 3.2, energy: 2.9, total: 10.8 },
  { date: '2024-08-25', transport: 5.8, diet: 3.0, energy: 3.1, total: 11.9 },
  { date: '2024-08-26', transport: 4.2, diet: 2.7, energy: 2.6, total: 9.5 },
  { date: '2024-08-27', transport: 3.9, diet: 3.3, energy: 2.8, total: 10.0 }
];

// Mock sentiment data
export const mockSentimentData = [
  { date: '2024-08-20', sentiment: 'positive', score: 0.8, reflection: 'Great day cycling to work!' },
  { date: '2024-08-21', sentiment: 'neutral', score: 0.1, reflection: 'Normal day, nothing special.' },
  { date: '2024-08-22', sentiment: 'negative', score: -0.6, reflection: 'Frustrated with traffic, used car instead of bike.' },
  { date: '2024-08-23', sentiment: 'positive', score: 0.9, reflection: 'Walked everywhere today, feeling energized!' },
  { date: '2024-08-24', sentiment: 'neutral', score: 0.2, reflection: 'Mixed day with some good and bad choices.' },
  { date: '2024-08-25', sentiment: 'negative', score: -0.4, reflection: 'Had to drive more than usual, feeling guilty.' },
  { date: '2024-08-26', sentiment: 'positive', score: 0.7, reflection: 'Made sustainable choices, proud of myself!' },
  { date: '2024-08-27', sentiment: 'positive', score: 0.6, reflection: 'Good balance today between convenience and sustainability.' }
];

// Activity categories and their carbon factors (kg CO2 per unit)
export const activityCategories = {
  transport: {
    car: { factor: 0.21, unit: 'km' },
    bus: { factor: 0.089, unit: 'km' },
    train: { factor: 0.041, unit: 'km' },
    bike: { factor: 0, unit: 'km' },
    walking: { factor: 0, unit: 'km' },
    flight: { factor: 0.255, unit: 'km' }
  },
  diet: {
    beef: { factor: 27, unit: 'serving' },
    pork: { factor: 12.1, unit: 'serving' },
    chicken: { factor: 6.9, unit: 'serving' },
    fish: { factor: 6.1, unit: 'serving' },
    vegetarian: { factor: 3.81, unit: 'meal' },
    vegan: { factor: 1.5, unit: 'meal' }
  },
  energy: {
    electricity: { factor: 0.233, unit: 'kWh' },
    gas: { factor: 0.185, unit: 'kWh' },
    heating: { factor: 0.216, unit: 'kWh' }
  }
};