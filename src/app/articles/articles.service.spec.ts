import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticlesService } from './articles.service';

interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: any[];
  events: any[];
}

interface ArticlesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
}

describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService]
    });
    service = TestBed.inject(ArticlesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch articles with default limit of 10', () => {
    const mockResponse: ArticlesResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {          id: 1,
          title: 'Test Article 1',
          url: 'http://test1.com',
          image_url: 'http://test1.com/image.jpg',
          news_site: 'Test News',
          summary: 'Test summary 1',
          published_at: '2025-06-14T10:00:00Z',
          updated_at: '2025-06-14T10:00:00Z',
          featured: false,
          launches: [],
          events: []
        },
        {          id: 2,
          title: 'Test Article 2',
          url: 'http://test2.com',
          image_url: 'http://test2.com/image.jpg',
          news_site: 'Test News',
          summary: 'Test summary 2',
          published_at: '2025-06-14T11:00:00Z',
          updated_at: '2025-06-14T11:00:00Z',
          featured: false,
          launches: [],
          events: []
        }
      ]
    };

    service.getArticles().subscribe(articles => {
      expect(articles.length).toBe(2);
      expect(articles).toEqual(mockResponse.results);
    });

    const req = httpMock.expectOne('https://api.spaceflightnewsapi.net/v4/articles/?limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch articles with custom limit', () => {
    const limit = 5;
    service.getArticles(limit).subscribe();

    const req = httpMock.expectOne(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch article by id', () => {
    const mockArticle: Article = {      id: 1,
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

    service.getArticleById(1).subscribe(article => {
      expect(article).toEqual(mockArticle);
    });

    const req = httpMock.expectOne('https://api.spaceflightnewsapi.net/v4/articles/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockArticle);
  });
});
