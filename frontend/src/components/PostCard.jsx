import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  // Function to truncate excerpt to 2-3 lines
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full sm:max-w-md mx-auto">
      <Card 
        className="rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 overflow-hidden border-0"
        imgAlt={post.title}
        imgSrc={post.coverImage}
      >
        <div className="p-6">
          {/* Title */}
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 leading-tight">
            <Link 
              to={`/post/${post.slug}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h5>

          {/* Metadata */}
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              by {post.author?.username}
            </span>
            <span className="mx-2">•</span>
            <time dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
          </div>

          {/* Excerpt */}
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-6 leading-relaxed">
            {truncateText(post.excerpt || post.body, 140)}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Read More Button */}
          <Link
            to={`/post/${post.slug}`}
            className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-200"
          >
            Read More
            <svg 
              className="w-4 h-4 ml-2" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 14 10"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default PostCard;