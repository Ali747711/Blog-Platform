import { useState, useEffect } from 'react';
import { apiGet } from '../utils/api';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await apiGet('/posts');
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  // Custom Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  // Custom Alert Component
  const Alert = ({ children, type = 'info' }) => {
    const alertClasses = {
      info: 'bg-blue-50 border border-blue-200 text-blue-800',
      error: 'bg-red-50 border border-red-200 text-red-800',
      warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800'
    };

    return (
      <div className={`p-4 rounded-lg ${alertClasses[type]}`} role="alert">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm font-medium">{children}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Sharing thoughts, tutorials, and stories
            </p>
            
            {/* Search Input */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search posts..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Loading amazing posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mb-8">
            <Alert type="error">{error}</Alert>
          </div>
        )}

        {/* Posts Section */}
        {!loading && !error && (
          <>
            {/* Posts Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'Latest Posts'}
              </h2>
              <p className="text-gray-600">
                {searchTerm 
                  ? `Found ${filteredPosts.length} post${filteredPosts.length !== 1 ? 's' : ''}`
                  : `Discover ${posts.length} amazing post${posts.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                {searchTerm ? (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-600">Try searching with different keywords</p>
                  </div>
                ) : (
                  <Alert type="info">
                    No posts yet. Check back soon for amazing content!
                  </Alert>
                )}
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination Placeholder */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-1">
              <button className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
                Previous
              </button>
              <button className="px-3 py-2 leading-tight text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700">
                1
              </button>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                2
              </button>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                3
              </button>
              <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">My Blog</h3>
              <p className="text-gray-400">Sharing knowledge, one post at a time</p>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 My Blog. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;