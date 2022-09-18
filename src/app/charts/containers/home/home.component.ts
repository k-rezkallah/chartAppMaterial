import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import { ChartInterface } from '../../models/chart.model';
import * as fromStore from '../../store';

import * as fromAppStore from '../../../app/store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  noData$!: Observable<boolean>;

  isSettings$!: Observable<boolean>;

  initialFromToDate$!: Observable<Date[]>;
  initialFromToDate!: Date[];
  subscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new fromStore.LoadChartsAction());

    // disable range component if no data
    this.noData$ = this.store
      .select(fromStore.getAllCharts)
      .pipe(map((charts: ChartInterface[]) => charts.length > 0));
    // according to the router store url show or hide settings
    this.isSettings$ = this.store
      .select(fromAppStore.selectUrl)
      .pipe(map((url) => (url === '/viewmode' ? false : true)));

    // initilize the date range by subscritption instead of useing async on the template
    // this.initialFromToDate$ =
    this.subscription = this.store
      .select(fromStore.getFromToDate)
      .pipe(
        map((dateRange: { from: Date; to: Date }) => {
          return [dateRange.from, dateRange.to];
        })
      )
      .subscribe((newDateRange: Date[]) => {
        this.initialFromToDate = newDateRange;
      });
  }

  getFromToDate(event$: Date[]) {
    this.store.dispatch(new fromStore.DateRangeChangeAction(event$));
  }
  addChartEvent(newChart: ChartInterface): void {
    this.store.dispatch(new fromStore.AddChartAction(newChart));
    console.log('dispatch after Output => ', newChart);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
