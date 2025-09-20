'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Award,
  Briefcase,
  Target,
  Zap,
  Shield,
  Globe,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({
    matches: 1250,
    companies: 150,
    successRate: 89
  });

  useEffect(() => {
    setIsVisible(true);
    // Animate stats
    const interval = setInterval(() => {
      setStats(prev => ({
        matches: Math.min(prev.matches + 50, 1250),
        companies: Math.min(prev.companies + 5, 150),
        successRate: Math.min(prev.successRate + 3, 89)
      }));
    }, 100);

    setTimeout(() => clearInterval(interval), 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI-powered algorithm matches your skills with perfect internship opportunities using advanced ML models.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get matched with internships in seconds, not weeks. Our system processes applications lightning-fast.'
    },
    {
      icon: Shield,
      title: 'Verified Companies',
      description: 'All partner companies are verified and vetted to ensure quality internship experiences.'
    },
    {
      icon: Globe,
      title: 'Global Opportunities',
      description: 'Access internships from startups to Fortune 500 companies worldwide, including remote positions.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'PM Intern at TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      quote: 'Found my dream PM internship in just 2 days! The matching algorithm is incredibly accurate.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Analyst at StartupXYZ',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      quote: 'The platform connected me with opportunities I never would have found otherwise.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Junior PM at HealthTech',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      quote: 'Seamless experience from application to onboarding. Highly recommend to fellow PM students.',
      rating: 5
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Create Your Profile',
      description: 'Add your skills, experience, and preferences to build your PM profile.'
    },
    {
      step: 2,
      title: 'Get Matched',
      description: 'Our AI algorithm finds the best internship matches based on your profile.'
    },
    {
      step: 3,
      title: 'Apply & Interview',
      description: 'Apply to matched opportunities and schedule interviews directly through the platform.'
    },
    {
      step: 4,
      title: 'Start Your Journey',
      description: 'Land your dream PM internship and kickstart your product management career.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-8">
              <Award className="w-4 h-4 mr-2" />
              #1 PM Internship Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
              Find Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 block">
                PM Internship
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with top companies through intelligent skill matching. Join thousands of PM students 
              who've launched their careers with our AI-powered platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/dashboard"
                className="group inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Watch Demo
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.matches.toLocaleString()}+
                </div>
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from PM students who landed their dream internships through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your PM Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful PM interns who found their perfect match through our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className="group inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
          
          <div className="mt-12 text-primary-100 text-sm">
            <p>✓ Free to join • ✓ No hidden fees • ✓ Cancel anytime</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}<div className="text-gray-600 dark:text-gray-400 mt-1">Successful Matches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.companies}+
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.successRate}%
                </div>
                <div className="text-gray-600 dark:text-gray-400 mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose PM Skills Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powered by advanced machine learning and designed specifically for aspiring product managers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get matched with your ideal PM internship in four simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>