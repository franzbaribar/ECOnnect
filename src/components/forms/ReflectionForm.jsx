import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import Card from '../common/Card';

const ReflectionForm = ({ onSubmit }) => {
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reflection.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        date: new Date().toISOString().split('T')[0],
        reflection: reflection.trim(),
        timestamp: new Date().toISOString()
      });
      
      setReflection('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title="Daily Reflection">
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <MessageSquare className="h-5 w-5" />
          <p className="text-sm">
            How did you feel about your environmental choices today? 
            Your reflection will be analyzed for sentiment patterns.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reflection" className="block text-sm font-medium text-gray-700 mb-2">
            Today's Reflection
          </label>
          <textarea
            id="reflection"
            rows={6}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="input-field resize-none"
            placeholder="Share your thoughts about today's environmental choices, how they made you feel, any challenges you faced, or victories you celebrated..."
            maxLength={1000}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {reflection.length}/1000 characters
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Be honest about your feelings - this helps track your environmental journey
          </p>
          
          <button
            type="submit"
            disabled={!reflection.trim() || isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Reflection'}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ReflectionForm;