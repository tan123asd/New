import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
    
    // Log to monitoring service if available
    if (process.env.NODE_ENV === 'production') {
      // Add error logging service here
      console.error('Production error:', error);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Có lỗi xảy ra
              </h2>
              
              <p className="text-gray-600 mb-6">
                Ứng dụng đã gặp lỗi không mong muốn. Vui lòng thử lại hoặc liên hệ hỗ trợ.
              </p>
              
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-left">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button
                  onClick={this.handleReload}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Tải lại trang
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
