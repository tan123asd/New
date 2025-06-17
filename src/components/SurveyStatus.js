import React from 'react';
import { FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';

const SurveyStatus = () => {
  const surveys = [
    {
      id: 1,
      title: 'Weekly Recovery Check-in',
      status: 'completed',
      completedDate: '2025-06-15',
      nextDue: '2025-06-22'
    },
    {
      id: 2,
      title: 'Mental Health Assessment',
      status: 'pending',
      dueDate: '2025-06-18'
    },
    {
      id: 3,
      title: 'Progress Evaluation',
      status: 'overdue',
      dueDate: '2025-06-16'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'overdue':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Survey Status</h2>
      <div className="space-y-4">
        {surveys.map((survey) => (
          <div key={survey.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(survey.status)}
              <div>
                <h3 className="font-medium text-gray-800">{survey.title}</h3>
                <p className="text-sm text-gray-600">
                  {survey.status === 'completed' 
                    ? `Completed on ${survey.completedDate}` 
                    : `Due: ${survey.dueDate || survey.nextDue}`
                  }
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(survey.status)}`}>
              {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyStatus;
