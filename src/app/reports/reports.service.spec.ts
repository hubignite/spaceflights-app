import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportsService } from './reports.service';

interface Report {
  id: number;
  title: string;
  authors: string[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
}

interface ReportsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Report[];
}

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportsService]
    });
    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch reports with default limit of 10', () => {
    const mockResponse: ReportsResponse = {
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          title: 'Test Report 1',
          authors: ['Test Author'],
          url: 'http://test1.com',
          image_url: 'http://test1.com/image.jpg',
          news_site: 'Test News',
          summary: 'Test summary 1',
          published_at: '2025-06-14T10:00:00Z',
          updated_at: '2025-06-14T10:00:00Z'
        },
        {
          id: 2,
          title: 'Test Report 2',
          authors: ['Test Author'],
          url: 'http://test2.com',
          image_url: 'http://test2.com/image.jpg',
          news_site: 'Test News',
          summary: 'Test summary 2',
          published_at: '2025-06-14T11:00:00Z',
          updated_at: '2025-06-14T11:00:00Z'
        }
      ]
    };

    service.getReports().subscribe(reports => {
      expect(reports.length).toBe(2);
      expect(reports).toEqual(mockResponse.results);
    });

    const req = httpMock.expectOne('https://api.spaceflightnewsapi.net/v4/reports?limit=10');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch reports with custom limit', () => {
    const limit = 5;
    service.getReports(limit).subscribe();

    const req = httpMock.expectOne(`https://api.spaceflightnewsapi.net/v4/reports?limit=${limit}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch report by id', () => {
    const mockReport: Report = {
      id: 1,
      title: 'Test Report',
      authors: ['Test Author'],
      url: 'http://test.com',
      image_url: 'http://test.com/image.jpg',
      news_site: 'Test News',
      summary: 'Test summary',
      published_at: '2025-06-14T10:00:00Z',
      updated_at: '2025-06-14T10:00:00Z'
    };

    service.getReportById(1).subscribe(report => {
      expect(report).toEqual(mockReport);
    });

    const req = httpMock.expectOne('https://api.spaceflightnewsapi.net/v4/reports/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockReport);
  });
});
