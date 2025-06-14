import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ArticlesComponent } from './articles.component';
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

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articlesService: ArticlesService;
  let mockArticles: Article[];

  beforeEach(async () => {
    mockArticles = [
      {
        id: 1,
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
      }
    ];

    await TestBed.configureTestingModule({
      imports: [
        ArticlesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    articlesService = TestBed.inject(ArticlesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles on init', () => {
    spyOn(articlesService, 'getArticles').and.returnValue(of(mockArticles));
    fixture.detectChanges();

    expect(component.articles).toEqual(mockArticles);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should load articles with custom count when filtered', () => {
    spyOn(articlesService, 'getArticles').and.returnValue(of(mockArticles));
    component.articleCount = 5;
    component.loadArticles();

    expect(articlesService.getArticles).toHaveBeenCalledWith(5);
  });
  it('should handle error when loading articles fails', () => {
    spyOn(articlesService, 'getArticles').and.returnValue(throwError(() => new Error('API Error')));
    component.loadArticles();
    fixture.detectChanges();

    expect(component.error).toBeTruthy();
    expect(component.loading).toBeFalse();
  });

  it('should open article in new window', () => {
    spyOn(window, 'open');
    const url = 'http://test.com';
    component.openArticle(url);

    expect(window.open).toHaveBeenCalledWith(url, '_blank');
  });
});
