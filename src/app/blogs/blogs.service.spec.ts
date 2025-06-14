import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BlogsService } from './blogs.service';

interface BlogAuthor {
  name: string;
  socials: any | null;
}

interface Blog {
  id: number;
  title: string;
  authors: BlogAuthor[];
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

interface BlogsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
}

describe('BlogsService', () => {
  let service: BlogsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogsService]
    });
    service = TestBed.inject(BlogsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch blogs with default limit of 10', () => {
    const mockResponse: BlogsResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          title: 'Test Blog 1',
          authors: [{ name: 'Test Author', socials: null }],
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
        {
          id: 2,
          title: 'Test Blog 2',
          authors: [{ name: 'Test Author', socials: null }],
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

    service.getBlogs().subscribe(blogs => {
      expect(blogs.length).toBe(2);
      expect(blogs).toEqual(mockResponse.results);
    });

    const req = httpMock.expectOne('https://api.spaceflightnewsapi.net/v4/blogs?limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch blogs with custom limit', () => {
    const limit = 5;
    service.getBlogs(limit).subscribe();

    const req = httpMock.expectOne(`https://api.spaceflightnewsapi.net/v4/blogs?limit=${limit}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch blog by id', () => {
    const mockBlog: Blog = {
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

    service.getBlogById(1).subscribe(blog => {
      expect(blog).toEqual(mockBlog);
    });

    const req = httpMock.expectOne('https://api.spaceflightnewsapi.net/v4/blogs/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockBlog);
  });
});
