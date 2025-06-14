import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog, BlogsResponse } from './blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/blogs';
   
  constructor(private http: HttpClient) { }
     getBlogs(limit: number = 10): Observable<Blog[]> {
    const params = new HttpParams()
      .set('limit', limit.toString());
    
    return this.http.get<BlogsResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response.results)
      );
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }
}