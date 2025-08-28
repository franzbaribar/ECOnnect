import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Heart, Leaf, Combine } from 'lucide-react';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import CarbonFootprintChart from '../components/charts/CarbonFootprintChart';
import SentimentChart from '../components/charts/SentimentChart';
import CombinedChart from '../components/charts/CombinedChart';
import { mockApi } from '../services/mockApi';

const DashboardPage = () => {
  const [carbonData, setCarbonData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [carbonResult, sentimentResult] = await Promise.all([
        mockApi.getCarbonData(),
        mockApi.getSentimentData()
      ]);

      if (carbonResult.success) setCarbonData(carbonResult.data);
      if (sentimentResult.success) setSentimentData(sentimentResult.data);
      
      // Create combined data if both datasets are available
      if (carbonResult.success && sentimentResult.success) {
        const combined = combineData(carbonResult.data, sentimentResult.data);
        setCombinedData(combined);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to combine carbon and sentiment data
  const combineData = (carbonData, sentimentData) => {
    // This is a simple combination - you might need to adjust based on your data structure
    return carbonData.map((carbonDay, index) => {
      const sentimentDay = sentimentData[index] || {};
      return {
        date: carbonDay.date,
        carbon: carbonDay.total,
        sentiment: sentimentDay.score || 0,
        mood: sentimentDay.sentiment || 'neutral'
      };
    });
  };

  const calculateStats = () => {
    if (!carbonData.length || !sentimentData.length) return null;

    const totalCarbon = carbonData.reduce((sum, day) => sum + day.total, 0);
    const avgDaily = totalCarbon / carbonData.length;
    
    const positiveDays = sentimentData.filter(day => day.sentiment === 'positive').length;
    const sentimentPercentage = (positiveDays / sentimentData.length) * 100;
    
    const lastWeekCarbon = carbonData.slice(-7).reduce((sum, day) => sum + day.total, 0);
    const prevWeekCarbon = carbonData.slice(-14, -7).reduce((sum, day) => sum + day.total, 0);
    const carbonTrend = prevWeekCarbon > 0 ? ((lastWeekCarbon - prevWeekCarbon) / prevWeekCarbon) * 100 : 0;

    return {
      totalCarbon: totalCarbon.toFixed(1),
      avgDaily: avgDaily.toFixed(1),
      sentimentPercentage: sentimentPercentage.toFixed(0),
      carbonTrend: carbonTrend.toFixed(1)
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Eco Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Track your environmental impact and emotional journey
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-field"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-3">
                <Leaf className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Total CO₂</h3>
              <p className="text-2xl font-bold text-primary-600">{stats.totalCarbon} kg</p>
              <p className="text-sm text-gray-600">Past {dateRange === '7d' ? '7 days' : dateRange === '30d' ? '30 days' : '3 months'}</p>
            </Card>

            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-full mx-auto mb-3">
                <Calendar className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Daily Average</h3>
              <p className="text-2xl font-bold text-secondary-600">{stats.avgDaily} kg</p>
              <p className="text-sm text-gray-600">CO₂ per day</p>
            </Card>

            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Positive Days</h3>
              <p className="text-2xl font-bold text-green-600">{stats.sentimentPercentage}%</p>
              <p className="text-sm text-gray-600">Good mood days</p>
            </Card>

            <Card className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-3">
                <TrendingUp className={`h-6 w-6 ${parseFloat(stats.carbonTrend) <= 0 ? 'text-green-600' : 'text-orange-600'}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Weekly Trend</h3>
              <p className={`text-2xl font-bold ${parseFloat(stats.carbonTrend) <= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                {parseFloat(stats.carbonTrend) > 0 ? '+' : ''}{stats.carbonTrend}%
              </p>
              <p className="text-sm text-gray-600">vs last week</p>
            </Card>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CarbonFootprintChart data={carbonData} />
          <SentimentChart data={sentimentData} />
          {combinedData.length > 0 && (
            <div className="lg:col-span-2">
              <CombinedChart carbonData={carbonData} sentimentData={sentimentData} />
            </div>
          )}
        </div>

        {/* Combined Insights */}
        <Card title="Weekly Insights">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Carbon Footprint Pattern</p>
                <p className="text-sm text-gray-600">
                  Your average daily footprint is {stats?.avgDaily} kg CO₂. 
                  {parseFloat(stats?.carbonTrend || 0) <= 0 
                    ? ' Great job reducing your impact this week!' 
                    : ' Consider reviewing your transport and energy usage.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Emotional Wellbeing</p>
                <p className="text-sm text-gray-600">
                  You had positive feelings about your eco-choices {stats?.sentimentPercentage}% of tracked days.
                  {parseFloat(stats?.sentimentPercentage || 0) >= 70 
                    ? ' You\'re doing great maintaining a positive environmental mindset!' 
                    : ' Consider focusing on small, achievable green actions to boost your confidence.'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-secondary-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Recommendation</p>
                <p className="text-sm text-gray-600">
                  Try setting small daily goals like walking instead of driving for short trips, 
                  or having one plant-based meal. Small changes lead to big improvements over time!
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;