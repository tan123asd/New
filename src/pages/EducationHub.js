import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaVideo, FaFileAlt, FaHeadphones, FaSearch, FaFilter } from 'react-icons/fa';
import ApiService from '../services/api';
import './EducationHub.css'; // Import the dedicated CSS file

const EducationHub = () => {
  const [educationContent, setEducationContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Content' },
    { id: 'addiction', name: 'Understanding Addiction' },
    { id: 'recovery', name: 'Recovery Process' },
    { id: 'wellness', name: 'Mental Wellness' },
    { id: 'support', name: 'Support Systems' },
    { id: 'relapse', name: 'Relapse Prevention' }  ];

  const fetchEducationContent = async () => {
    try {
      const content = await ApiService.getEducationContent();
      setEducationContent(content);
    } catch (error) {
      console.error('Failed to fetch education content:', error);
      // Mock data for demonstration
      const mockContent = [
        {
          id: 1,
          title: 'Understanding Addiction: The Science Behind It',
          description: 'Learn about the neurological and psychological aspects of addiction.',
          type: 'article',
          category: 'addiction',
          duration: '15 min read',
          difficulty: 'Beginner',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          id: 2,
          title: 'Building a Strong Recovery Foundation',
          description: 'Essential steps to create a solid foundation for your recovery journey.',
          type: 'video',
          category: 'recovery',
          duration: '25 min',
          difficulty: 'Intermediate',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          id: 3,
          title: 'Mindfulness and Mental Wellness',
          description: 'Discover mindfulness techniques to support your mental health.',
          type: 'audio',
          category: 'wellness',
          duration: '20 min',
          difficulty: 'Beginner',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          id: 4,
          title: 'Creating Your Support Network',
          description: 'How to build and maintain meaningful support relationships.',
          type: 'article',
          category: 'support',
          duration: '12 min read',
          difficulty: 'Beginner',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          id: 5,
          title: 'Recognizing and Preventing Relapse',
          description: 'Identify warning signs and develop prevention strategies.',
          type: 'video',
          category: 'relapse',
          duration: '30 min',
          difficulty: 'Advanced',
          thumbnail: '/api/placeholder/300/200'
        },
        {
          id: 6,
          title: 'Nutrition and Recovery',
          description: 'The role of proper nutrition in supporting recovery.',
          type: 'article',
          category: 'wellness',
          duration: '10 min read',
          difficulty: 'Beginner',
          thumbnail: '/api/placeholder/300/200'
        }
      ];
      setEducationContent(mockContent);
    } finally {
      setLoading(false);
    }
  };

  const filterContent = useCallback(() => {
    let filtered = educationContent;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContent(filtered);
  }, [educationContent, selectedCategory, searchTerm]);

  useEffect(() => {
    fetchEducationContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [filterContent]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <FaVideo className="text-red-500" />;
      case 'audio':
        return <FaHeadphones className="text-green-500" />;
      case 'article':
        return <FaFileAlt className="text-blue-500" />;
      default:
        return <FaBook className="text-purple-500" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
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
          <p className="mt-4 text-gray-600">Loading education content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Education Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expand your knowledge with our comprehensive library of educational resources designed to support your recovery journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for topics, articles, videos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Content</h2>
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Recovery Fundamentals Course</h3>
                <p className="text-lg mb-6">
                  A comprehensive 8-week course covering the essential aspects of addiction recovery, 
                  from understanding triggers to building lasting habits.
                </p>
                <Link
                  to="/courses/recovery-fundamentals"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 inline-block"
                >
                  Start Course
                </Link>
              </div>
              <div className="text-center">
                <FaBook className="text-6xl mb-4 mx-auto opacity-80" />
                <p className="text-lg">8 Modules • 40+ Resources • Certificate Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Content ({filteredContent.length})
            </h2>
            <Link
              to="/courses"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Courses →
            </Link>
          </div>

          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-white text-6xl opacity-80">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        {getTypeIcon(item.type)}
                        <span className="ml-1">{item.duration}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 capitalize">
                        {categories.find(cat => cat.id === item.category)?.name}
                      </span>
                      <Link
                        to={`/education/${item.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300"
                      >
                        {item.type === 'article' ? 'Read' : item.type === 'video' ? 'Watch' : 'Listen'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No content found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to dive deeper?</h2>
          <p className="text-gray-600 mb-6">
            Explore our structured courses designed to guide you through your recovery journey step by step.
          </p>
          <Link
            to="/courses"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 inline-block"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;
