import { Injectable } from '@angular/core';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ChartInterface } from '../../models/chart.model';
import { ChartsService } from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class ChartsEffects {
  constructor(
    private actions$: Actions,
    private chartsService: ChartsService
  ) {}

  loading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.LOAD_CHARTS),
      switchMap(() => {
        return this.chartsService.getCharts().pipe(
          map(
            (chart: ChartInterface[]) =>
              new fromActions.LoadChartsSuccessAction(chart)
          ),
          catchError((error) => of(new fromActions.LoadChartsFailAction(error)))
        );
      })
    );
  });
  filtering$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.DATERANGE_CHANGE),
      switchMap(() => {
        return this.chartsService.getCharts().pipe(
          map(
            (chart: ChartInterface[]) =>
              new fromActions.DateRangeChangeSuccessAction(chart)
          ),
          catchError((error) =>
            of(new fromActions.DateRangeChangeFailAction(error))
          )
        );
      })
    );
  });

  addingChart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.ADD_CHART),
      map((action: fromActions.AddChartAction) => {
        return action.payload;
      }),
      switchMap((chart: ChartInterface) => {
        return this.chartsService.addChart(chart).pipe(
          map(
            (chart: ChartInterface) =>
              new fromActions.AddChartSuccessAction(chart)
          ),
          catchError((error) => of(new fromActions.AddChartFailAction(error)))
        );
      })
    );
  });

  removeChart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.REMOVE_CHART),
      map((action: fromActions.RemoveChartAction) => action.payload),
      switchMap((id: number) => {
        return this.chartsService.removeChart(id).pipe(
          map(() => new fromActions.RemoveChartSuccessAction(id)),
          catchError((error) =>
            of(new fromActions.RemoveChartFailAction(error))
          )
        );
      })
    );
  });

  updateChart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromActions.UPDATE_CHART),
      map((action: fromActions.UpdateChartAction) => action.payload),
      switchMap((chart: ChartInterface) => {
        return this.chartsService.updateChart(chart).pipe(
          map(() => new fromActions.UpdateChartSuccessAction(chart)),
          catchError((error) =>
            of(new fromActions.UpdateChartFailAction(error))
          )
        );
      })
    );
  });
}
