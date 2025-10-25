// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Week3App</h3>
            <p className="text-gray-400 text-sm">
              A React application demonstrating component architecture, 
              state management, and API integration with Tailwind CSS v4.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tasks" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Task Manager
                </Link>
              </li>
              <li>
                <Link to="/api-data" className="text-gray-400 hover:text-white transition-colors text-sm">
                  API Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>React Documentation</li>
              <li>Tailwind CSS v4</li>
              <li>GitHub Repository</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Copyright {currentYear} Week3App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}