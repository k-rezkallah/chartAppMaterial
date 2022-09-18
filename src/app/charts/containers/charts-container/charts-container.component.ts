import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ChartInterface } from '../../models/chart.model';
import * as fromStore from '../../store';
import * as fromAppStore from '../../../app/store';
@Component({
  selector: 'app-charts-container',
  templateUrl: './charts-container.component.html',
  styleUrls: ['./charts-container.component.scss'],
})
export class ChartsContainerComponent implements OnInit {
  charts$!: Observable<ChartInterface[]>;
  isSettings$!: Observable<boolean>;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.charts$ = this.store$.select(fromStore.getAllCharts);

    // showing or hide settings an tell children
    this.isSettings$ = this.store$
      .select(fromAppStore.selectUrl)
      .pipe(map((url) => (url === '/viewmode' ? false : true)));
  }
  updateChart(chart: ChartInterface) {
    console.log('container receive update event for chart ', chart);
    this.store$.dispatch(new fromStore.UpdateChartAction(chart));
  }
  removeChart(id: number) {
    this.store$.dispatch(new fromStore.RemoveChartAction(id));
  }
}
