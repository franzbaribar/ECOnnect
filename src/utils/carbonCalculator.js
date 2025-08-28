// Carbon emission factors (kg CO2 per unit)
export const emissionFactors = {
  transport: {
    car: 0.21,      // kg CO2 per km
    bus: 0.089,     // kg CO2 per km
    train: 0.041,   // kg CO2 per km
    bike: 0,        // kg CO2 per km
    walking: 0,     // kg CO2 per km
    flight: 0.255,  // kg CO2 per km
    motorcycle: 0.103, // kg CO2 per km
    subway: 0.028   // kg CO2 per km
  },
  diet: {
    beef: 27,       // kg CO2 per serving
    pork: 12.1,     // kg CO2 per serving
    chicken: 6.9,   // kg CO2 per serving
    fish: 6.1,      // kg CO2 per serving
    vegetarian: 3.81, // kg CO2 per meal
    vegan: 1.5      // kg CO2 per meal
  },
  energy: {
    electricity: 0.233, // kg CO2 per kWh (average grid)
    gas: 0.185,         // kg CO2 per kWh
    heating: 0.216,     // kg CO2 per kWh
    solar: 0.041,       // kg CO2 per kWh
    wind: 0.011         // kg CO2 per kWh
  }
};

/**
 * Calculate carbon footprint for a single activity
 * @param {string} category - The category of activity (transport, diet, energy)
 * @param {string} type - The specific type within the category
 * @param {number} value - The amount/quantity
 * @returns {number} Carbon footprint in kg CO2
 */
export const calculateActivityFootprint = (category, type, value) => {
  const factor = emissionFactors[category]?.[type];
  
  if (typeof factor !== 'number' || typeof value !== 'number') {
    return 0;
  }
  
  return factor * value;
};

/**
 * Calculate total carbon footprint for multiple activities
 * @param {Array} activities - Array of activity objects
 * @returns {Object} Breakdown of emissions by category and total
 */
export const calculateTotalFootprint = (activities) => {
  const breakdown = {
    transport: 0,
    diet: 0,
    energy: 0,
    total: 0
  };

  activities.forEach(activity => {
    const { category, type, value } = activity;
    const emissions = calculateActivityFootprint(category, type, parseFloat(value) || 0);
    
    if (breakdown.hasOwnProperty(category)) {
      breakdown[category] += emissions;
      breakdown.total += emissions;
    }
  });

  // Round to 2 decimal places
  Object.keys(breakdown).forEach(key => {
    breakdown[key] = Math.round(breakdown[key] * 100) / 100;
  });

  return breakdown;
};

/**
 * Get emission factor for an activity
 * @param {string} category - The category of activity
 * @param {string} type - The specific type within the category
 * @returns {number} Emission factor in kg CO2 per unit
 */
export const getEmissionFactor = (category, type) => {
  return emissionFactors[category]?.[type] || 0;
};

/**
 * Compare two carbon footprints and calculate percentage change
 * @param {number} current - Current footprint value
 * @param {number} previous - Previous footprint value
 * @returns {Object} Change amount and percentage
 */
export const compareFootprints = (current, previous) => {
  if (previous === 0) {
    return {
      change: current,
      percentage: current > 0 ? 100 : 0,
      trend: current > 0 ? 'increase' : 'stable'
    };
  }

  const change = current - previous;
  const percentage = (change / previous) * 100;
  
  return {
    change: Math.round(change * 100) / 100,
    percentage: Math.round(percentage * 10) / 10,
    trend: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'stable'
  };
};

/**
 * Generate sustainability recommendations based on footprint data
 * @param {Object} footprint - Footprint breakdown by category
 * @returns {Array} Array of recommendation objects
 */
export const generateRecommendations = (footprint) => {
  const recommendations = [];
  const { transport, diet, energy, total } = footprint;

  // Transport recommendations
  if (transport > 5) {
    recommendations.push({
      category: 'transport',
      priority: 'high',
      message: 'Consider using public transport, cycling, or walking for short trips to reduce transport emissions.',
      potentialSaving: transport * 0.3 // Estimate 30% reduction potential
    });
  } else if (transport > 2) {
    recommendations.push({
      category: 'transport',
      priority: 'medium',
      message: 'You\'re doing well with transport! Try carpooling or combining trips to optimize further.',
      potentialSaving: transport * 0.15
    });
  }

  // Diet recommendations
  if (diet > 8) {
    recommendations.push({
      category: 'diet',
      priority: 'high',
      message: 'Try reducing meat consumption or choosing chicken/fish over beef to lower your food footprint.',
      potentialSaving: diet * 0.4
    });
  } else if (diet > 4) {
    recommendations.push({
      category: 'diet',
      priority: 'medium',
      message: 'Consider having one or two plant-based meals per week to further reduce your impact.',
      potentialSaving: diet * 0.2
    });
  }

  // Energy recommendations
  if (energy > 4) {
    recommendations.push({
      category: 'energy',
      priority: 'high',
      message: 'Look into energy-efficient appliances and consider reducing heating/cooling usage.',
      potentialSaving: energy * 0.25
    });
  } else if (energy > 2) {
    recommendations.push({
      category: 'energy',
      priority: 'medium',
      message: 'You\'re managing energy well! Small actions like LED bulbs can help reduce further.',
      potentialSaving: energy * 0.1
    });
  }

  // Overall recommendation
  if (total < 8) {
    recommendations.push({
      category: 'overall',
      priority: 'positive',
      message: 'Excellent work! You\'re maintaining a low carbon footprint. Keep up the great habits!',
      potentialSaving: 0
    });
  }

  return recommendations;
};