import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { BlogsService } from './blogs.service';
import { Blog } from './blog';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatChipsModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;
  error: string | null = null;

  constructor(private blogsService: BlogsService) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.loading = true;
    this.error = null;
    
    this.blogsService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blogs. Please try again later.';
        this.loading = false;
        console.error('Error loading blogs:', error);
      }
    });
  }

  openBlog(url: string) {
    window.open(url, '_blank');
  }
}
