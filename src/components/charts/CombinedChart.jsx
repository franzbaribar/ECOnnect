import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const CombinedChart = ({ carbonData, sentimentData }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Combine carbon and sentiment data by date
  const combinedData = carbonData.map(carbonItem => {
    const sentimentItem = sentimentData.find(s => s.date === carbonItem.date);
    return {
      ...carbonItem,
      sentiment: sentimentItem ? sentimentItem.score : 0,
      sentimentLabel: sentimentItem ? sentimentItem.sentiment : 'neutral'
    };
  });

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{formatDate(label)}</p>
          {payload.map((entry, index) => {
            if (entry.dataKey === 'total') {
              return (
                <p key={index} style={{ color: entry.color }}>
                  Carbon Footprint: {entry.value.toFixed(1)} kg CO₂
                </p>
              );
            } else if (entry.dataKey === 'sentiment') {
              return (
                <p key={index} style={{ color: entry.color }}>
                  Sentiment: {data.sentimentLabel} ({entry.value > 0 ? '+' : ''}{entry.value.toFixed(1)})
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <Card title="Carbon Footprint vs Emotional Response">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              className="text-sm"
            />
            <YAxis 
              yAxisId="carbon"
              orientation="left"
              label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
              className="text-sm"
            />
            <YAxis 
              yAxisId="sentiment"
              orientation="right"
              domain={[-1, 1]}
              label={{ value: 'Sentiment', angle: 90, position: 'insideRight' }}
              className="text-sm"
            />
            <Tooltip content={customTooltip} />
            <Legend />
            
            {/* Carbon footprint as bars */}
            <Bar 
              yAxisId="carbon"
              dataKey="total" 
              fill="#10b981" 
              fillOpacity={0.6}
              name="Carbon Footprint (kg CO₂)"
            />
            
            {/* Sentiment as line */}
            <Line 
              yAxisId="sentiment"
              type="monotone" 
              dataKey="sentiment" 
              stroke="#dc2626" 
              strokeWidth={3}
              name="Sentiment Score"
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Understanding the Connection</h4>
        <p className="text-sm text-gray-600">
          This chart shows the relationship between your daily carbon footprint and how you felt about your environmental choices. 
          Look for patterns: Do higher carbon days correlate with negative emotions? This insight helps you understand your eco-anxiety and motivation patterns.
        </p>
      </div>
    </Card>
  );
};

export default CombinedChart;