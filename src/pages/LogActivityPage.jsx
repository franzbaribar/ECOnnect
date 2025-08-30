import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import ActivityLogForm from '../components/forms/ActivityLogForm';
import ReflectionForm from '../components/forms/ReflectionForm';
import { mockApi } from '../services/mockApi';

const LogActivityPage = ({ currentPage, onNavigate }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleActivitySubmit = async (activityData) => {
    try {
      const result = await mockApi.logActivity(activityData);
      if (result.success) {
        setSuccessMessage('Activities logged successfully! 🌱');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  const handleReflectionSubmit = async (reflectionData) => {
    try {
      const result = await mockApi.logReflection(reflectionData);
      if (result.success) {
        setSuccessMessage('Reflection saved successfully! ✨');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to save reflection:', error);
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={onNavigate}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Log Your Daily Impact</h1>
          <p className="text-gray-600 mt-1">
            Record your activities and reflect on your environmental choices
          </p>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ActivityLogForm onSubmit={handleActivitySubmit} />
          </div>
          <div>
            <ReflectionForm onSubmit={handleReflectionSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LogActivityPage;