import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
navigate('/dashboard');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            {/* <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src="/full-logo.png" 
                  alt="Fitizen Organizer" 
                  className="h-8 w-auto"
                />
              </Link>
            </div> */}

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  to="/auth/sign-in"
                  className="text-dark-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link to="/auth/onboarding">
                  <Button variant="primary" size="md">
                    Register
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-dark-600 hover:text-primary focus:outline-none focus:text-primary"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/auth/sign-in"
                className="text-dark-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/auth/onboarding"
                className="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary-600 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary-100/30 to-primary/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold text-dark-900 mb-6 animate-fade-in">
            <span className="text-primary">Your Event.</span>
            <br />
            <span className="text-dark-900">Your Rules.</span>
            <br />
            <span className="text-primary">Your Dashboard.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-dark-600 mb-8 animate-fade-in-delay-1 max-w-3xl mx-auto">
          Create, manage, and grow your events with the same energy you bring to the starting line. With Fitizen, you get real-time insights, effortless registrations, and tools to keep your participants engaged
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-delay-2">
            <Link to="/auth/onboarding">
              <Button variant="primary" size="lg" className="text-lg px-8 py-4">
                Get Started Now <ArrowRightIcon className="w-5 h-5 ml-2 inline-block" />
              </Button>
            </Link>
            {/* <Link to="/events/create">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Preview Dashboard
              </Button>
            </Link> */}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-delay-3">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-dark-600">Events Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-dark-600">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-dark-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6">
              Everything You Need to
              <span className="text-primary"> Organize Events</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              From simple meetups to complex multi-day conferences, our platform provides all the tools you need to create successful events.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group">
              <div className="bg-gradient-to-br from-secondary-100 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="mb-6">
                  <img 
                    src="/bank_Low_Fees and_Competitive_Rates.gif" 
                    alt="Low Fees" 
                    className="w-full h-48 object-contain rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">
                  Get Started Quickly
                </h3>
                <p className="text-dark-600 mb-6 flex-grow">
                  Set up your organizer account in minutes with our streamlined onboarding process. No complex configurations needed.
                </p>
                <ul className="space-y-2 text-dark-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant account creation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Guided setup wizard
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Pre-built templates
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="bg-gradient-to-br from-secondary-100 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="mb-6">
                  <img 
                    src="/Get Started Quickly_with_Your_Organizer_Account.gif" 
                    alt="Quick Setup" 
                    className="w-full h-48 object-contain rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">
                  Low Fees & Competitive Rates
                </h3>
                <p className="text-dark-600 mb-6 flex-grow">
                  Keep more of your revenue with our transparent pricing structure and competitive processing fees.
                </p>
                <ul className="space-y-2 text-dark-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Transparent pricing
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No hidden fees
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Volume discounts
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group">
              <div className="bg-gradient-to-br from-secondary-100 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="mb-6">
                  <img 
                    src="/event-tracking-in-reacl_time_notification.gif" 
                    alt="Real-time Tracking" 
                    className="w-full h-48 object-contain rounded-lg shadow-md"
                  />
                </div>
                <h3 className="text-2xl font-bold text-dark-900 mb-4">
                  Real-Time Event Tracking
                </h3>
                <p className="text-dark-600 mb-6 flex-grow">
                  Monitor your events in real-time with instant notifications and live analytics dashboard.
                </p>
                <ul className="space-y-2 text-dark-600">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Live registration updates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant notifications
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent-green mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Revenue analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-dark-900 mb-6">
              Advanced Features for
              <span className="text-primary"> Professional Organizers</span>
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto">
              Take your events to the next level with our comprehensive suite of professional tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Dynamic Forms</h3>
              <p className="text-dark-600">Build custom registration forms with our advanced form builder.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Analytics Dashboard</h3>
              <p className="text-dark-600">Track registrations, revenue, and participant engagement in real-time.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Sub-Events</h3>
              <p className="text-dark-600">Create complex multi-day events with multiple sessions and tracks.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h6v-2H4v2zM4 11h6V9H4v2zM4 7h6V5H4v2zM10 7h10V5H10v2zM10 11h10V9H10v2zM10 15h10v-2H10v2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-900 mb-2">Smart Notifications</h3>
              <p className="text-dark-600">Automated alerts for registrations, payments, and important updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Events?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who trust our platform to create successful, engaging events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/onboarding">
              <Button variant="primary" size="lg" className="text-lg px-8 py-4  text-black hover:bg-gray-50">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between flex-wrap gap-8">
            <div>
              {/* <img 
                src="/full-logo.png" 
                alt="Fitizen Organizer" 
                className="h-8 w-auto mb-4"
              /> */}
              <p className="text-dark-300 mb-4 max-w-md">
                The ultimate platform for event organizers to create, manage, and track successful events with powerful analytics and seamless participant registration.
              </p>
            </div>
              <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-dark-300">
                <li><a href="tel:9833111510" className="hover:text-white transition-colors">+91 98331 11510</a></li>
                <li><a href="tel:9594001042" className="hover:text-white transition-colors">+91 95940 01042</a></li>
              </ul>
            </div>
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold mb-4">Email</h3>
              <ul className="space-y-2 text-dark-300">
                <li><a href="mailto:marketing@fitizenindia.com" className="hover:text-white transition-colors">marketing@fitizenindia.com</a></li>
                <li><a href="mailto:supportevents@fitizenindia.com" className="hover:text-white transition-colors">supportevents@fitizenindia.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-300">
            <p>&copy; 2024 Fitizen Organizer. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-1 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-2 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay-3 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Home;