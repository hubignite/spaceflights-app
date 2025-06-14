import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReportsService, Report } from './reports.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatIconModule, MatButtonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {  reports: Report[] = [];
  displayedColumns: string[] = ['title', 'news_site', 'published_at', 'actions'];

  constructor(private reportsService: ReportsService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportsService.getReports().subscribe(
      reports => this.reports = reports
    );
  }
  openReport(url: string) {
    window.open(url, '_blank');
  }
}
