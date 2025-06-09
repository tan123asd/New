import React, { useState, useEffect } from 'react';
import { surveyService } from '../api/services/surveyService';

const SurveyStatus = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Sử dụng userId cố định từ ví dụ của bạn
    const sampleUserId = 'a0c8f4b2-3bcd-4c8c-998e-42c8c89f5cf9';

    const checkSurveyStatus = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await surveyService.checkStatus(sampleUserId);
            setStatus(response);
        } catch (err) {
            setError(err.response?.data?.message || 'Không thể kiểm tra trạng thái survey');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSurveyStatus();
    }, []);

    return (
        <div className="p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Trạng thái Survey
                    </div>
                    
                    {loading && (
                        <div className="mt-4 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                            <p className="mt-2 text-gray-600">Đang kiểm tra...</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {status && !loading && (
                        <div className="mt-4">
                            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                                {JSON.stringify(status, null, 2)}
                            </pre>
                        </div>
                    )}

                    <button
                        onClick={checkSurveyStatus}
                        disabled={loading}
                        className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Đang kiểm tra...' : 'Kiểm tra lại trạng thái'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SurveyStatus; 