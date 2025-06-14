import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  { path: 'home', component: ArticlesComponent },
  { path: 'products', component: BlogsComponent },
  { path: 'products', component: ReportsComponent },
];
