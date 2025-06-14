import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  REPORT_STUB = [];
    
  constructor() { }
    
  getReports(): Observable<Report[]> {
    return of(this.REPORT_STUB);
  }
}
