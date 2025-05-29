
import { BlogPost } from '@/utils/markdownParser';
import { formatDate } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPost;
}

const BlogPostView = ({ post }: BlogPostViewProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <span>{formatDate(post.date)}</span>
            <span>{post.readTime} min read</span>
          </div>
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      {/* Comments Section (Static for now) */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="text-blue-400" size={20} />
          <h3 className="text-xl font-semibold text-white">
            Comments (0)
          </h3>
        </div>

        <div className="text-center py-8 text-gray-400">
          <MessageCircle className="mx-auto mb-2" size={24} />
          <p>Comments functionality requires backend integration.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostView;
