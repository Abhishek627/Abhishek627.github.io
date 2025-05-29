
export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface BlogPost extends BlogMetadata {
  id: string;
  slug: string;
  content: string;
}

export const parseMarkdown = (content: string, slug: string): BlogPost => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    console.error('Failed to parse frontmatter for:', slug);
    console.error('Content preview:', content.substring(0, 200));
    throw new Error('Invalid markdown format');
  }
  
  const [, frontmatter, markdownContent] = match;
  const metadata: BlogMetadata = {
    title: '',
    excerpt: '',
    date: '',
    readTime: 0,
    tags: []
  };
  
  // Parse frontmatter line by line
  frontmatter.split(/\r?\n/).forEach(line => {
    if (line.trim() === '') return;
    
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();
    
    // Remove quotes if present
    const cleanValue = value.replace(/^["']|["']$/g, '');
    
    switch (key) {
      case 'title':
        metadata.title = cleanValue;
        break;
      case 'excerpt':
        metadata.excerpt = cleanValue;
        break;
      case 'date':
        metadata.date = cleanValue;
        break;
      case 'readTime':
        metadata.readTime = parseInt(cleanValue) || 0;
        break;
      case 'tags':
        // Handle array format: ["tag1", "tag2", "tag3"]
        const tagsMatch = cleanValue.match(/\[(.*?)\]/);
        if (tagsMatch) {
          metadata.tags = tagsMatch[1]
            .split(',')
            .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
            .filter(tag => tag.length > 0);
        }
        break;
    }
  });
  
  return {
    ...metadata,
    id: slug,
    slug,
    content: markdownContent.trim()
  };
};
