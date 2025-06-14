import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  ARTICLE_STUB = [
  ];
 
  constructor() { }
 
  getArticles(): Observable<Article[]> {
    return of(this.ARTICLE_STUB);
  }
}
