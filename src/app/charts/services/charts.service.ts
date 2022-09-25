import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChartInterface } from '../models/chart.model';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

@Injectable()
export class ChartsService {
  constructor(private http$: HttpClient, private firestore: Firestore) {}

  getCharts(): Observable<ChartInterface[]> {
    // const ref = doc(this.firestore, 'users', user?.uid);
    // return docData(ref) as Observable<ProfileUser>; // docData give us real time update

    // return this.firestore.collection<Employee>('employees').valueChanges();

    // const mycollection = collection(this.firestore, 'charts');
    // const item$ = collectionData(mycollection) as Observable<ChartInterface[]>;
    // return item$;

    return this.http$
      .get<ChartInterface[]>(environment.apiUrl)
      .pipe(catchError((error: any) => of(error.json())));
  }

  // addChart(chart: ChartInterface): Observable<any> {
  //   // chart.id = this.afs.createId
  //   return from(this.afs.collection('/charts').add(chart)).pipe(
  //     tap(console.log),
  //     catchError((error: any) => of(error.json()))
  //   );
  //   return this.http$
  //     .post<ChartInterface>(environment.apiUrl, chart)
  //     .pipe(catchError((error: any) => of(error.json())));
  // }

  addChart(chart: ChartInterface): Observable<ChartInterface> {
    // const ref = doc(this.firestore,'charts');

    // return from( setDoc(ref, chart) ) as Observable<ChartInterface>;

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
