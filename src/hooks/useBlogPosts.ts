
import { useState, useEffect } from 'react';
import { BlogPost, parseMarkdown } from '@/utils/markdownParser';

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setIsLoading(true);
        
        // Define the markdown files to load
        const blogFiles = [
          'react-typescript-web-apps',
          'future-frontend-development', 
          'web-performance-optimization'
        ];
        
        const posts: BlogPost[] = [];
        
        for (const slug of blogFiles) {
          try {
            // Try different possible paths for the markdown files
            const possiblePaths = [
              `/src/blogs/${slug}.md`,
              `/blogs/${slug}.md`,
              `./src/blogs/${slug}.md`
            ];
            
            let content = null;
            let loadedPath = null;
            
            for (const path of possiblePaths) {
              try {
                const response = await fetch(path);
                if (response.ok) {
                  content = await response.text();
                  loadedPath = path;
                  break;
                }
              } catch (pathErr) {
                // Continue to next path
                continue;
              }
            }
            
            if (content) {
              console.log(`Successfully loaded blog from: ${loadedPath}`);
              const post = parseMarkdown(content, slug);
              posts.push(post);
            } else {
              console.warn(`Could not load blog post: ${slug} from any path`);
            }
          } catch (err) {
            console.warn(`Failed to parse blog post: ${slug}`, err);
          }
        }
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setBlogPosts(posts);
        
        if (posts.length === 0) {
          setError('No blog posts could be loaded');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  return { blogPosts, isLoading, error };
};
