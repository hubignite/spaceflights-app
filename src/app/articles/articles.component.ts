import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from './articles.service';
import { Article } from './article';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  loading = true;
  error: string | null = null;
  articleCount = 10;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.error = null;
    this.articlesService.getArticles(this.articleCount).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load articles. Please try again later.';
        this.loading = false;
        console.error('Error loading articles:', error);
      }
    });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }
}
