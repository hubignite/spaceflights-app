import { Blog } from './blog';

describe('Blog', () => {
  it('should match the interface structure', () => {
    const blog: Blog = {
      id: 1,
      title: 'Test Blog',
      authors: [{ name: 'Test Author', socials: null }],
      url: 'http://test.com',
      image_url: 'http://test.com/image.jpg',
      news_site: 'Test News',
      summary: 'Test summary',
      published_at: '2025-06-14T10:00:00Z',
      updated_at: '2025-06-14T10:00:00Z',
      featured: false,
      launches: [],
      events: []
    };
    expect(blog.id).toBe(1);
    expect(blog.title).toBe('Test Blog');
    expect(blog.authors[0].name).toBe('Test Author');
  });
});
