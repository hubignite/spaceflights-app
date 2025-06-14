import { Injectable } from '@angular/core';
import { Blog } from './blog';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  BLOG_STUB = [];
   
  constructor() { }
   
  getArticles(): Observable<Blog[]> {
    return of(this.BLOG_STUB);
  }
}
