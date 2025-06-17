import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaBook, FaClock, FaUsers, FaStar, FaCheckCircle } from 'react-icons/fa';
import ApiService from '../services/api';
import './CoursesPage.css'; // Import the dedicated CSS file

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const coursesData = await ApiService.getCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      // Mock data
      setCourses([
        {
          id: 1,
          title: 'Recovery Fundamentals',
          description: 'Master the essential concepts and strategies for successful addiction recovery.',
          instructor: 'Dr. Sarah Johnson',
          duration: '8 weeks',
          lessons: 24,
          students: 1250,
          rating: 4.9,
          level: 'Beginner',
          price: 'Free',
          enrolled: true,
          progress: 65
        },
        {
          id: 2,
          title: 'Cognitive Behavioral Therapy Techniques',
          description: 'Learn practical CBT methods to change negative thought patterns and behaviors.',
          instructor: 'Dr. Michael Chen',
          duration: '6 weeks',
          lessons: 18,
          students: 890,
          rating: 4.8,
          level: 'Intermediate',
          price: '$49',
          enrolled: false,
          progress: 0
        },
        {
          id: 3,
          title: 'Mindfulness and Meditation',
          description: 'Develop mindfulness practices to support mental wellness and recovery.',
          instructor: 'Dr. Emily Rodriguez',
          duration: '4 weeks',
          lessons: 12,
          students: 2100,
          rating: 4.9,
          level: 'Beginner',
          price: 'Free',
          enrolled: true,
          progress: 100
        },
        {
          id: 4,
          title: 'Building Support Networks',
          description: 'Learn how to create and maintain healthy relationships during recovery.',
          instructor: 'Dr. David Park',
          duration: '5 weeks',
          lessons: 15,
          students: 650,
          rating: 4.7,
          level: 'Intermediate',
          price: '$29',
          enrolled: false,
          progress: 0
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Recovery Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning paths designed by experts to guide you through every step of your recovery journey.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <FaBook className="text-6xl opacity-80" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="text-lg font-bold text-green-600">{course.price}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPlay className="mr-2" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="mr-2" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <FaStar className="mr-2 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Instructor: {course.instructor}</p>
                </div>
                
                {course.enrolled ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    {course.progress === 100 ? (
                      <div className="flex items-center justify-center text-green-600 font-medium">
                        <FaCheckCircle className="mr-2" />
                        Completed
                      </div>
                    ) : (
                      <Link
                        to={`/courses/${course.id}`}
                        className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Continue Course
                      </Link>
                    )}
                  </div>
                ) : (
                  <Link
                    to={`/courses/${course.id}`}
                    className="block w-full bg-green-600 text-white text-center px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Enroll Now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Can't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6">
            Explore our comprehensive education hub for additional resources and materials.
          </p>
          <Link
            to="/education"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 inline-block"
          >
            Browse Education Hub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
