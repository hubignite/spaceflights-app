import { Article } from './article';

describe('Article', () => {
  it('should match the interface structure', () => {
    const article: Article = {
      id: 1,
      title: 'Test Article',
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
    expect(article.id).toBe(1);
    expect(article.title).toBe('Test Article');
  });
});
