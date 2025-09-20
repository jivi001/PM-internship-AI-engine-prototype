'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target } from 'lucide-react';

const SkillsChart = ({ compact = false }) => {
  const [animatedValues, setAnimatedValues] = useState({});

  const skillsData = [
    { name: 'User Research', level: 90, category: 'core', color: 'bg-blue-500', lightColor: 'bg-blue-100' },
    { name: 'Product Strategy', level: 85, category: 'core', color: 'bg-purple-500', lightColor: 'bg-purple-100' },
    { name: 'A/B Testing', level: 85, category: 'core', color: 'bg-green-500', lightColor: 'bg-green-100' },
    { name: 'Agile/Scrum', level: 90, category: 'core', color: 'bg-indigo-500', lightColor: 'bg-indigo-100' },
    { name: 'Figma', level: 80, category: 'technical', color: 'bg-pink-500', lightColor: 'bg-pink-100' },
    { name: 'Data Analysis', level: 75, category: 'technical', color: 'bg-orange-500', lightColor: 'bg-orange-100' },
    { name: 'SQL', level: 70, category: 'technical', color: 'bg-teal-500', lightColor: 'bg-teal-100' },
    { name: 'Wireframing', level: 85, category: 'technical', color: 'bg-red-500', lightColor: 'bg-red-100' },
  ];

  const displaySkills = compact ? skillsData.slice(0, 5) : skillsData;

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated = {};
      displaySkills.forEach((skill) => {
        animated[skill.name] = skill.level;
      });
      setAnimatedValues(animated);
    }, 100);

    return () => clearTimeout(timer);
  }, [displaySkills]);

  const getSkillLevel = (level) => {
    if (level >= 90) return { text: 'Expert', color: 'text-green-600 dark:text-green-400' };
    if (level >= 80) return { text: 'Advanced', color: 'text-blue-600 dark:text-blue-400' };
    if (level >= 70) return { text: 'Intermediate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { text: 'Beginner', color: 'text-gray-600 dark:text-gray-400' };
  };

  const coreSkills = displaySkills.filter(skill => skill.category === 'core');
  const technicalSkills = displaySkills.filter(skill => skill.category === 'technical');
  const avgSkillLevel = Math.round(displaySkills.reduce((sum, skill) => sum + skill.level, 0) / displaySkills.length);

  if (compact) {
    return (
      <div className="space-y-4">
        {/* Overall Stats */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgSkillLevel}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Avg. Skill Level
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
              {displaySkills.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Skills Tracked
            </div>
          </div>
        </div>

        {/* Top Skills */}
        <div className="space-y-3">
          {displaySkills.map((skill) => {
            const currentValue = animatedValues[skill.name] || 0;
            const skillLevelInfo = getSkillLevel(skill.level);
            
            return (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium ${skillLevelInfo.color}`}>
                      {skillLevelInfo.text}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${currentValue}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="w-full text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium mt-4">
          View All Skills →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {avgSkillLevel}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average Skill Level
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {skillsData.filter(s => s.level >= 85).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Advanced Skills
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            +15%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Growth This Month
          </div>
        </div>
      </div>

      {/* Core Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-blue-500" />
          Core PM Skills
        </h3>
        <div className="space-y-4">
          {coreSkills.map((skill) => {
            const currentValue = animatedValues[skill.name] || 0;
            const skillLevelInfo = getSkillLevel(skill.level);
            
            return (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${skill.lightColor} ${skillLevelInfo.color}`}>
                      {skillLevelInfo.text}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${currentValue}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-500" />
          Technical Skills
        </h3>
        <div className="space-y-4">
          {technicalSkills.map((skill) => {
            const currentValue = animatedValues[skill.name] || 0;
            const skillLevelInfo = getSkillLevel(skill.level);
            
            return (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${skill.lightColor} ${skillLevelInfo.color}`}>
                      {skillLevelInfo.text}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`${skill.color} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${currentValue}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-2">
          Skill Recommendations
        </h4>
        <p className="text-blue-800 dark:text-blue-300 text-sm mb-4">
          Based on your current skill set and trending PM requirements:
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-blue-800 dark:text-blue-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Focus on improving SQL skills to reach advanced level
          </div>
          <div className="flex items-center text-sm text-blue-800 dark:text-blue-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Consider learning Python for data analysis
          </div>
          <div className="flex items-center text-sm text-blue-800 dark:text-blue-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Explore advanced product analytics tools
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsChart;