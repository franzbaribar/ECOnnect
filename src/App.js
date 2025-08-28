import React, { useState, useEffect } from 'react';
import DashboardPage from './pages/DashboardPage';
import LogActivityPage from './pages/LogActivityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('econnect_user');
    const storedToken = localStorage.getItem('econnect_token');
    
    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('econnect_user');
    localStorage.removeItem('econnect_token');
    setCurrentUser(null);
    setCurrentPage('login');
  };

  // Navigation handler
  useEffect(() => {
    const handleNavigation = (e) => {
      // Only handle navigation for our app's links
      if (e.target.getAttribute('data-nav') === 'true') {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        if (href === '/') {
          setCurrentPage('dashboard');
        } else if (href === '/log') {
          setCurrentPage('log');
        } else if (href === '/login') {
          setCurrentPage('login');
        } else if (href === '/signup') {
          setCurrentPage('signup');
        }
      }
    };

    // Add click listeners to navigation links
    const navLinks = document.querySelectorAll('a[data-nav="true"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavigation);
    });

    // Cleanup
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavigation);
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Show auth pages if user is not logged in
  if (!currentUser) {
    if (currentPage === 'signup') {
      return <SignupPage onSignup={handleSignup} />;
    }
    return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => setCurrentPage('signup')} />;
  }

  // Show main app pages for logged-in users
  const renderPage = () => {
    switch (currentPage) {
      case 'log':
        return <LogActivityPage />;
      case 'dashboard':
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary-600">EConnect</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/"
                  data-nav="true"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === 'dashboard'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </a>
                <a
                  href="/log"
                  data-nav="true"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    currentPage === 'log'
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Log Activity
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm">
                    Hello, {currentUser.name || currentUser.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;