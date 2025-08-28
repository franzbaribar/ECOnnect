import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const SentimentChart = ({ data }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#10b981';
      case 'neutral': return '#6b7280';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const processedData = data.map(item => ({
    ...item,
    color: getSentimentColor(item.sentiment)
  }));

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold">{formatDate(label)}</p>
          <p style={{ color: payload[0].color }}>
            Sentiment: {data.sentiment} ({data.score > 0 ? '+' : ''}{data.score.toFixed(1)})
          </p>
          <p className="text-sm text-gray-600 mt-1">"{data.reflection}"</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card title="Daily Sentiment Tracking">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              className="text-sm"
            />
            <YAxis 
              label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft' }}
              domain={[-1, 1]}
              className="text-sm"
            />
            <Tooltip content={customTooltip} />
            <Bar 
              dataKey="score" 
              fill="#8884d8"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Positive</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded"></div>
          <span>Neutral</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Negative</span>
        </div>
      </div>
    </Card>
  );
};

export default SentimentChart;