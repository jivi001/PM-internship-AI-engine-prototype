'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  color = 'blue',
  loading = false 
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      icon: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {title}
          </p>
          
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </p>
          
          {change && (
            <div className="flex items-center space-x-1">
              {changeType === 'positive' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {change}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                vs last period
              </span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;