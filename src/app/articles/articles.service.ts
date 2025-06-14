import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article, ArticlesResponse } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles/';
 
  constructor(private http: HttpClient) { }
 
  getArticles(limit: number = 10): Observable<Article[]> {
    const params = new HttpParams()
      .set('limit', limit.toString());

    return this.http.get<ArticlesResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response.results)
      );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}${id}`);
  }
}
