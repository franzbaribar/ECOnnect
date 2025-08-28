import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

const CarbonFootprintChart = ({ data }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(1)} kg CO₂`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card title="Carbon Footprint Trends">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              className="text-sm"
            />
            <YAxis 
              label={{ value: 'kg CO₂', angle: -90, position: 'insideLeft' }}
              className="text-sm"
            />
            <Tooltip content={customTooltip} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#059669" 
              strokeWidth={3}
              name="Total"
              dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="transport" 
              stroke="#0284c7" 
              strokeWidth={2}
              name="Transport"
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="diet" 
              stroke="#dc2626" 
              strokeWidth={2}
              name="Diet"
              strokeDasharray="5 5"
            />
            <Line 
              type="monotone" 
              dataKey="energy" 
              stroke="#d97706" 
              strokeWidth={2}
              name="Energy"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CarbonFootprintChart;