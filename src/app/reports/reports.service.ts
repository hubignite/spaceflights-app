import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Report {
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

export interface ReportsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Report[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/reports';

  constructor(private http: HttpClient) { }

  getReports(limit: number = 10): Observable<Report[]> {
    const params = new HttpParams()
      .set('limit', limit.toString());

    return this.http.get<ReportsResponse>(this.apiUrl, { params })
      .pipe(
        map(response => response.results)
      );
  }

  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }
}
