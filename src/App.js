import React, { useState, useEffect } from 'react';
import { Leaf, BarChart3, PlusCircle, User, LogOut, Menu, X } from 'lucide-react';
import DashboardPage from './pages/DashboardPage';
import LogActivityPage from './pages/LogActivityPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Navbar state management (from your Navbar component)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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

  // Navigation handler (adapted from your Navbar component)
  const handleNavClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

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
        return <LogActivityPage currentPage={currentPage} onNavigate={setCurrentPage} />;
      case 'dashboard':
      default:
        return <DashboardPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Enhanced Navigation Bar with Navbar logic */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">ECOnnect</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="/" 
                onClick={(e) => handleNavClick(e, 'dashboard')}
                className={`flex items-center space-x-2 transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-primary-600 font-medium' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
              <a 
                href="/log" 
                onClick={(e) => handleNavClick(e, 'log')}
                className={`flex items-center space-x-2 transition-colors ${
                  currentPage === 'log' 
                    ? 'text-primary-600 font-medium' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                <PlusCircle className="h-5 w-5" />
                <span>Log Activity</span>
              </a>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
              
              {/* User dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary-600 rounded-lg"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline text-sm font-medium">
                    {currentUser.name || 'User'}
                  </span>
                </button>
                
                {/* Dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-gray-500">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/"
                  onClick={(e) => handleNavClick(e, 'dashboard')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    currentPage === 'dashboard'
                      ? 'text-primary-600 bg-primary-50 font-medium'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </a>
                <a 
                  href="/log" 
                  onClick={(e) => handleNavClick(e, 'log')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    currentPage === 'log'
                      ? 'text-primary-600 bg-primary-50 font-medium'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Log Activity</span>
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Click outside to close dropdowns */}
        {(isUserMenuOpen || isMobileMenuOpen) && (
          <div
            className="fixed inset-0 z-30"
            onClick={() => {
              setIsUserMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
          />
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;