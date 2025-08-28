import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Card from '../common/Card';

const ActivityLogForm = ({ onSubmit }) => {
  const [activities, setActivities] = useState([
    { id: 1, category: 'transport', type: '', value: '', unit: '' }
  ]);

  const activityOptions = {
    transport: [
      { value: 'car', label: 'Car', unit: 'km' },
      { value: 'bus', label: 'Bus', unit: 'km' },
      { value: 'train', label: 'Train', unit: 'km' },
      { value: 'bike', label: 'Bicycle', unit: 'km' },
      { value: 'walking', label: 'Walking', unit: 'km' }
    ],
    diet: [
      { value: 'beef', label: 'Beef', unit: 'servings' },
      { value: 'pork', label: 'Pork', unit: 'servings' },
      { value: 'chicken', label: 'Chicken', unit: 'servings' },
      { value: 'fish', label: 'Fish', unit: 'servings' },
      { value: 'vegetarian', label: 'Vegetarian Meal', unit: 'meals' },
      { value: 'vegan', label: 'Vegan Meal', unit: 'meals' }
    ],
    energy: [
      { value: 'electricity', label: 'Electricity', unit: 'kWh' },
      { value: 'gas', label: 'Natural Gas', unit: 'kWh' },
      { value: 'heating', label: 'Heating', unit: 'kWh' }
    ]
  };

  const addActivity = () => {
    setActivities([
      ...activities,
      { id: Date.now(), category: 'transport', type: '', value: '', unit: '' }
    ]);
  };

  const removeActivity = (id) => {
    if (activities.length > 1) {
      setActivities(activities.filter(activity => activity.id !== id));
    }
  };

  const updateActivity = (id, field, value) => {
    setActivities(activities.map(activity => {
      if (activity.id === id) {
        const updated = { ...activity, [field]: value };
        
        // Auto-update unit when type changes
        if (field === 'type') {
          const option = activityOptions[activity.category]?.find(opt => opt.value === value);
          updated.unit = option?.unit || '';
        }
        
        return updated;
      }
      return activity;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validActivities = activities.filter(
      activity => activity.type && activity.value
    );
    
    if (validActivities.length > 0) {
      onSubmit({
        date: new Date().toISOString().split('T')[0],
        activities: validActivities
      });
      
      // Reset form
      setActivities([
        { id: Date.now(), category: 'transport', type: '', value: '', unit: '' }
      ]);
    }
  };

  return (
    <Card title="Log Daily Activities">
      <form onSubmit={handleSubmit} className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-900">
                Activity {index + 1}
              </h4>
              {activities.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeActivity(activity.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={activity.category}
                  onChange={(e) => {
                    updateActivity(activity.id, 'category', e.target.value);
                    updateActivity(activity.id, 'type', '');
                  }}
                  className="input-field"
                >
                  <option value="transport">Transport</option>
                  <option value="diet">Diet</option>
                  <option value="energy">Energy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={activity.type}
                  onChange={(e) => updateActivity(activity.id, 'type', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select type</option>
                  {activityOptions[activity.category]?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={activity.value}
                  onChange={(e) => updateActivity(activity.id, 'value', e.target.value)}
                  className="input-field"
                  placeholder="0.0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={activity.unit}
                  readOnly
                  className="input-field bg-gray-50"
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={addActivity}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Another Activity</span>
          </button>
          
          <button type="submit" className="btn-primary">
            Log Activities
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ActivityLogForm;