// src/pages/ApiData.jsx
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

export default function ApiData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.body.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Card className="max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠</div>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              Error Loading Data
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          API Data Explorer
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fetched from JSONPlaceholder API
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title or content..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <Button variant="secondary" onClick={() => setSearch('')}>
              Clear
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Found {filteredData.length} posts
        </p>
      </Card>

      {/* Data Grid */}
      {currentData.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No posts found matching your search criteria.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentData.map((post) => (
            <Card 
              key={post.id} 
              className="hover:scale-105 transition-transform duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 
                               text-white rounded-full flex items-center justify-center 
                               font-bold">
                  {post.id}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                  {post.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                {post.body}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  User ID: {post.userId}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (page <= 3) {
                  pageNum = idx + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = page - 2 + idx;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <Button
              variant="secondary"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Page {page} of {totalPages}
          </p>
        </Card>
      )}
    </div>
  );
}