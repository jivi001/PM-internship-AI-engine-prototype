'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Star, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck,
  Building,
  Calendar,
  DollarSign
} from 'lucide-react';

const MatchingTable = ({ matches = [], compact = false }) => {
  const [savedMatches, setSavedMatches] = useState(new Set());

  const handleSaveMatch = (matchId) => {
    const newSaved = new Set(savedMatches);
    if (newSaved.has(matchId)) {
      newSaved.delete(matchId);
    } else {
      newSaved.add(matchId);
    }
    setSavedMatches(newSaved);
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      applied: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      pending: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      interviewing: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return colors[status] || colors.new;
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-blue-600 dark:text-blue-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  if (matches.length === 0) {
    return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company & Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location & Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Match Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Posted
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {matches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={match.logo}
                      alt={match.company}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {match.role}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {match.company}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-900 dark:text-white">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {match.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {match.duration}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`text-lg font-bold ${getMatchScoreColor(match.matchScore)}`}>
                      {match.matchScore}%
                    </div>
                    <div className="ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 inline ${
                            i < Math.floor(match.matchScore / 20)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                    {match.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {match.posted}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleSaveMatch(match.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        savedMatches.has(match.id)
                          ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      title={savedMatches.has(match.id) ? 'Unsave match' : 'Save match'}
                    >
                      {savedMatches.has(match.id) ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                    
                    <button
                      className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      onClick={() => {
                        // Handle view details
                        console.log('View details for match:', match.id);
                      }}
                    >
                      View Details
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view for responsive design */}
      <div className="sm:hidden">
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={match.logo}
                  alt={match.company}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {match.role}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                      {match.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {match.company}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3 h-3 mr-1" />
                        {match.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {match.duration}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getMatchScoreColor(match.matchScore)}`}>
                        {match.matchScore}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        match score
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {match.posted}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSaveMatch(match.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          savedMatches.has(match.id)
                            ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {savedMatches.has(match.id) ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                      
                      <button className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
      <div className="text-center py-12">
        <Building className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No matches found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          We're working on finding the perfect internships for you. Check back soon!
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <img
              src={match.logo}
              alt={match.company}
              className="w-12 h-12 rounded-lg object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {match.role}
                </h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                  {match.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {match.company}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {match.location}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {match.duration}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-lg font-bold ${getMatchScoreColor(match.matchScore)}`}>
                {match.matchScore}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                match
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Building className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No matches found
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        We're working on finding the perfect internships for you. Check back soon!
      </p>
    </div>
  );
}

export default MatchingTable;