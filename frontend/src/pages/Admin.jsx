import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost, apiGet, isAuthenticated, removeAuthToken } from '../utils/api';

function Admin() {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    excerpt: '',
    tags: '',
    coverImage: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    fetchUserPosts();
  }, [navigate]);

  const fetchUserPosts = async () => {
    try {
      const allPosts = await apiGet('/posts');
      setPosts(allPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await apiPost('/posts', postData, true);
      
      setSuccess('Post created successfully!');
      setFormData({
        title: '',
        body: '',
        excerpt: '',
        tags: '',
        coverImage: ''
      });
      setShowCreateForm(false);
      
      // Refresh posts list
      fetchUserPosts();
      
      // Optionally navigate to home to see the new post
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error('Create post error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    removeAuthToken();
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <div className="grid gap-6">
        {/* Create Post Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create New Post</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showCreateForm ? 'Cancel' : 'New Post'}
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Body *
                </label>
                <textarea
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="technology, web development, react"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </form>
          )}
        </div>

        {/* Posts List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts found.</p>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 10).map((post) => (
                <div key={post._id} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  {post.excerpt && (
                    <p className="text-sm text-gray-700 mt-1">{post.excerpt}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;