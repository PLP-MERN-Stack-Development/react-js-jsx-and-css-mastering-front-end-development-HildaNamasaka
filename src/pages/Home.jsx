// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Week 3 React App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A comprehensive React application with Tailwind CSS v4
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/tasks">
            <Button variant="primary">Manage Tasks</Button>
          </Link>
          <Link to="/api-data">
            <Button variant="secondary">View API Data</Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Component Architecture">
          <p>Reusable components built with React best practices including Button, Card, Navbar, and Footer components.</p>
        </Card>

        <Card title="State Management">
          <p>Advanced state management using useState, useEffect, useContext, and custom hooks like useLocalStorage.</p>
        </Card>

        <Card title="API Integration">
          <p>Fetch and display data from external APIs with loading states, error handling, and search functionality.</p>
        </Card>

        <Card title="Tailwind CSS v4">
          <p>Modern styling using Tailwind CSS v4 with responsive design and custom animations.</p>
        </Card>

        <Card title="Dark Mode">
          <p>Theme switching between light and dark modes using React Context API and Tailwind's dark mode.</p>
        </Card>

        <Card title="React Router">
          <p>Client-side routing for seamless navigation between different pages and components.</p>
        </Card>
      </div>

      {/* Technology Stack */}
      <Card title="Technology Stack" className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 className="font-bold text-lg">React 18</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">UI Library</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 className="font-bold text-lg">Vite</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Build Tool</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 className="font-bold text-lg">Tailwind v4</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">CSS Framework</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 className="font-bold text-lg">React Router</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Routing</p>
          </div>
        </div>
      </Card>
    </div>
  );
}