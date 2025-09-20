'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Eye,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  ArrowUpRight,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import StatsCard from '@/components/dashboard/StatsCard';
import MatchingTable from '@/components/dashboard/MatchingTable';
import SkillsChart from '@/components/dashboard/SkillsChart';
import { analytics, matching, notifications } from '@/lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [matches, setMatches] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock user data - replace with real authentication
  const user = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    role: 'Product Management Student',
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResult, matchesResult, notificationsResult] = await Promise.all([
          analytics.getStats(user.id),
          matching.getMatches(user.id),
          notifications.getNotifications(user.id)
        ]);

        setStats(statsResult.data);
        setMatches(matchesResult.data);
        setRecentNotifications(notificationsResult.data.slice(0, 3));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Applications',
      value: stats?.totalApplications || 0,
      change: '+12%',
      changeType: 'positive',
      icon: Briefcase,
      color: 'blue'
    },
    {
      title: 'Profile Views',
      value: stats?.profileViews || 0,
      change: '+8%',
      changeType: 'positive',
      icon: Eye,
      color: 'purple'
    },
    {
      title: 'Interviews',
      value: stats?.interviews || 0,
      change: '+25%',
      changeType: 'positive',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Match Score Avg',
      value: `${stats?.avgMatchScore || 0}%`,
      change: '+3%',
      changeType: 'positive',
      icon: Target,
      color: 'orange'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'matches', label: 'Matches', icon: Target },
    { id: 'applications', label: 'Applications', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Interview with FinanceFlow',
      time: '2:00 PM Today',
      type: 'interview',
      location: 'Video Call'
    },
    {
      id: 2,
      title: 'Application Deadline - HealthTech',
      time: 'Tomorrow',
      type: 'deadline',
      location: 'Online Application'
    },
    {
      id: 3,
      title: 'Virtual Career Fair',
      time: 'Friday 10:00 AM',
      type: 'event',
      location: 'Virtual Event'
    }
  ];

  const quickActions = [
    { title: 'Find New Matches', icon: Target, href: '/matches', color: 'blue' },
    { title: 'Update Profile', icon: Users, href: '/profile', color: 'purple' },
    { title: 'View Analytics', icon: TrendingUp, href: '/reports', color: 'green' },
    { title: 'Settings', icon: CheckCircle, href: '/settings', color: 'orange' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar user={user} notifications={[]} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} notifications={recentNotifications} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your PM internship journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  icon={stat.icon}
                  color={stat.color}
                />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Matches */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Matches
                      </h2>
                      <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 text-sm font-medium">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <MatchingTable matches={matches.slice(0, 3)} compact />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={index}
                          className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${action.color}-100 dark:bg-${action.color}-900/30`}>
                            <Icon className={`w-4 h-4 text-${action.color}-600 dark:text-${action.color}-400`} />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white flex-1 text-left">
                            {action.title}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          event.type === 'interview' ? 'bg-green-500' :
                          event.type === 'deadline' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.time}
                            </span>
                            <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <MapPin className="w-3 h-3 mr-1" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Progress */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills Progress
                  </h3>
                  <SkillsChart compact />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matches Tab */}
        {selectedTab === 'matches' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Matches ({matches.length})
                </h2>
                <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
            <div className="p-6">
              <MatchingTable matches={matches} />
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {selectedTab === 'applications' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Applications
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Application tracking functionality coming soon...
            </p>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Analytics & Insights
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed analytics coming soon...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}