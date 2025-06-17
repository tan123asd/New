import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendar, 
  FaBook, 
  FaUsers, 
  FaChartLine, 
  FaTrophy,
  FaClock,  FaHeart,
  FaCheckCircle
} from 'react-icons/fa';
import ApiService from '../services/api';
import './Dashboard.css'; // Import the dedicated CSS file

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    daysSober: 0,
    completedCourses: 0,
    upcomingAppointments: 0,
    streakDays: 0,
    progress: {
      education: 0,
      counseling: 0,
      assessment: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentAchievements, setRecentAchievements] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
      const data = await ApiService.getDashboardData();
      if (data.success) {
        setDashboardData(data.data);
      }
      
      // Mock data for upcoming events and achievements vẫn giữ nguyên
      setUpcomingEvents([
        { id: 1, title: 'Counseling Session', date: '2025-06-18', time: '10:00 AM', type: 'counseling' },
        { id: 2, title: 'Group Therapy', date: '2025-06-19', time: '2:00 PM', type: 'group' },
        { id: 3, title: 'Assessment Review', date: '2025-06-20', time: '11:00 AM', type: 'assessment' }
      ]);
      
      setRecentAchievements([
        { id: 1, title: '7 Days Sober', icon: '🏆', date: '2025-06-10' },
        { id: 2, title: 'Completed Module 1', icon: '📚', date: '2025-06-15' },
        { id: 3, title: 'First Counseling Session', icon: '💪', date: '2025-06-16' }
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        <div className={`text-4xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ProgressBar = ({ label, percentage, color }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Here's your recovery progress overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaCalendar />}
            title="Days Sober"
            value={dashboardData.daysSober}
            color="text-green-600"
            subtitle="Keep going strong!"
          />
          <StatCard
            icon={<FaBook />}
            title="Courses Completed"
            value={dashboardData.completedCourses}
            color="text-blue-600"
            subtitle="Knowledge is power"
          />
          <StatCard
            icon={<FaUsers />}
            title="Upcoming Sessions"
            value={dashboardData.upcomingAppointments}
            color="text-purple-600"
            subtitle="This week"
          />
          <StatCard
            icon={<FaTrophy />}
            title="Current Streak"
            value={`${dashboardData.streakDays} days`}
            color="text-yellow-600"
            subtitle="Personal best!"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Progress Overview</h2>
              <ProgressBar 
                label="Education Progress" 
                percentage={dashboardData.progress.education} 
                color="bg-blue-500"
              />
              <ProgressBar 
                label="Counseling Sessions" 
                percentage={dashboardData.progress.counseling} 
                color="bg-green-500"
              />
              <ProgressBar 
                label="Assessment Completion" 
                percentage={dashboardData.progress.assessment} 
                color="bg-purple-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/courses"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-300"
                >
                  <FaBook className="text-blue-600 text-2xl mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Continue Learning</p>
                    <p className="text-sm text-gray-600">Resume your courses</p>
                  </div>
                </Link>

                <Link
                  to="/counseling"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition duration-300"
                >
                  <FaHeart className="text-green-600 text-2xl mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Book Session</p>
                    <p className="text-sm text-gray-600">Schedule counseling</p>
                  </div>
                </Link>

                <Link
                  to="/assessment"
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-300"
                >
                  <FaChartLine className="text-purple-600 text-2xl mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">Take Assessment</p>
                    <p className="text-sm text-gray-600">Track your progress</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaClock className="text-blue-600 mr-3" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/calendar"
                className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium"
              >
                View Full Calendar
              </Link>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Achievements</h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-2xl mr-3">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.date}</p>
                    </div>
                    <FaCheckCircle className="text-green-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Daily Motivation</h3>
              <p className="text-sm italic">
                "Recovery is not a race. You don't have to feel guilty if it takes you longer than you thought it would."
              </p>
              <p className="text-sm mt-2 opacity-75">- Anonymous</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
