import React, { useState, useEffect } from 'react';
import { FaUsers, FaCalendar, FaClock, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import ApiService from '../services/api';
import './ProgramPage.css'; // Import the dedicated CSS file

const ProgramPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const programsData = await ApiService.getPrograms();
      setPrograms(programsData);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
      // Mock data
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
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (programId) => {
    try {
      await ApiService.enrollInProgram(programId);
      fetchPrograms(); // Refresh programs
    } catch (error) {
      console.error('Failed to enroll in program:', error);
    }
  };

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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Recovery Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join structured programs designed to provide comprehensive support throughout your recovery journey.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-32 bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white">
                <FaHeart className="text-4xl opacity-80" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    program.type === 'Group' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {program.type}
                  </span>
                  <span className="text-lg font-bold text-green-600">{program.price}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaClock className="mr-3 text-blue-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-3 text-green-500" />
                    <span>{program.schedule}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-3 text-purple-500" />
                    <span>{program.participants}/{program.maxParticipants} participants</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-red-500" />
                    <span>Starts {new Date(program.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-medium">{program.maxParticipants - program.participants} spots left</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${(program.participants / program.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {program.enrolled ? (
                  <div className="bg-green-50 border border-green-200 text-green-800 text-center px-4 py-2 rounded-lg font-medium">
                    Enrolled
                  </div>
                ) : (
                  <button
                    onClick={() => handleEnroll(program.id)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Program Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Peer Support</h3>
              <p className="text-gray-600">Connect with others who understand your journey and provide mutual support.</p>
            </div>
            <div className="text-center">
              <FaHeart className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Guidance</h3>
              <p className="text-gray-600">Receive expert guidance from licensed professionals throughout your program.</p>
            </div>
            <div className="text-center">
              <FaCalendar className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Structured Schedule</h3>
              <p className="text-gray-600">Follow a proven structure that helps build healthy routines and habits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
