
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { BlogPost } from "@/utils/markdownParser";
import { formatDate } from "@/lib/utils";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import BlogPostView from "./BlogPost";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  const { blogPosts, isLoading, error } = useBlogPosts();

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [blogPosts]);

  // Filter posts based on search term and selected tag
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === "" || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === "" || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [blogPosts, searchTerm, selectedTag]);

  if (selectedPost) {
    return (
      <section id="blog" className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              ← Back to all posts
            </button>
          </div>
          <BlogPostView post={selectedPost} />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sharing thoughts on technology, development, and digital innovation
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === ""
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTag === tag
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-400 text-sm">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            {selectedTag && ` in "${selectedTag}"`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400 text-lg">Error loading blog posts: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-400 text-sm">{formatDate(post.date)}</span>
                    <span className="text-gray-400 text-sm">{post.readTime} min read</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 group-hover:underline">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No results message */}
        {!isLoading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedTag("");
              }}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
