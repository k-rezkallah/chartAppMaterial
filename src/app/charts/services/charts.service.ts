import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartInterface } from '../models/chart.model';

@Injectable()
export class ChartsService {
  constructor(private http$: HttpClient) {}

  getCharts(): Observable<ChartInterface[]> {
    return this.http$
      .get<ChartInterface[]>(environment.apiUrl)
      .pipe(catchError((error: any) => of(error.json())));
  }

  addChart(chart: ChartInterface): Observable<ChartInterface> {
    return this.http$
      .post<ChartInterface>(environment.apiUrl, chart)
      .pipe(catchError((error: any) => of(error.json())));
  }

  removeChart(id: number): Observable<ChartInterface> {
    return this.http$
      .delete<any>(environment.apiUrl + id)
      .pipe(catchError((error: any) => of(error.json())));
  }

  updateChart(chart: ChartInterface): Observable<ChartInterface> {
    return this.http$
      .put<ChartInterface>(environment.apiUrl + chart.id, chart)
      .pipe(catchError((error: any) => of(error.json())));
  }
}
