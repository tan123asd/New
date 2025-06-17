import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendar, FaClock, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import ApiService from '../services/api';
import { useApi } from '../hooks/useApi';
import { NotificationService } from '../services/errorHandler';
import './ProgramPage.css';

const ProgramPage = () => {
  const { loading, error, callApi } = useApi();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await callApi(() => ApiService.getPrograms());
      if (response.success && response.data) {
        setPrograms(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      // Mock data as fallback
      setPrograms([
        {
          id: 1,
          title: '12-Step Recovery Program',
          description: 'A comprehensive 12-step program with group support and individual guidance.',
          duration: '12 weeks',
          type: 'Group',
          schedule: 'Mondays & Wednesdays, 7-8 PM',
          participants: 15,
          maxParticipants: 20,
          startDate: '2025-06-25',
          price: 'Free',
          enrolled: false
        },
        {
          id: 2,
          title: 'Intensive Outpatient Program',
          description: 'Structured program combining therapy, education, and peer support.',
          duration: '8 weeks',
          type: 'Hybrid',
          schedule: 'Mon, Wed, Fri 6-9 PM',
          participants: 8,
          maxParticipants: 12,
          startDate: '2025-07-01',
          price: '$200',
          enrolled: true
        },
        {
          id: 3,
          title: 'Family Support Program',
          description: 'Support program for families affected by addiction.',
          duration: '6 weeks',
          type: 'Group',
          schedule: 'Saturdays, 10 AM-12 PM',
          participants: 12,
          maxParticipants: 15,
          startDate: '2025-06-28',
          price: 'Free',
          enrolled: false
        }
      ]);
    }
  };

  const handleEnroll = async (programId) => {
    try {
      const response = await callApi(() => ApiService.enrollProgram(programId));
      if (response.success) {
        NotificationService.success('Đăng ký chương trình thành công!');
        fetchPrograms(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to enroll program:', error);
      NotificationService.error('Có lỗi xảy ra khi đăng ký chương trình.');
    }
  };

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading programs: {error}</p>
        <button onClick={fetchPrograms}>Retry</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recovery Programs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comprehensive recovery programs designed to support your journey to wellness.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    program.type === 'Group' ? 'bg-blue-100 text-blue-800' : 
                    program.type === 'Individual' ? 'bg-green-100 text-green-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {program.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {program.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendar className="mr-2 text-green-500" />
                    <span>{program.schedule}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-2 text-purple-500" />
                    <span>{program.participants}/{program.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <span>Starts {program.startDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {program.price}
                  </span>
                  
                  {program.enrolled ? (
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">
                      Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(program.id)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <FaHeart className="text-6xl text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our counselors are here to help you select the right program for your recovery journey.
            </p>
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 font-medium">
              Contact a Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
