import { Action } from '@ngrx/store';
import { ChartInterface } from '../../models/chart.model';

export const LOAD_CHARTS = '[Charts] Load Charts';
export const LOAD_CHARTS_SUCESS = '[Charts] Load Charts Success';
export const LOAD_CHARTS_FAIL = '[Charts] Load Charts Fail';

export class LoadChartsAction implements Action {
  readonly type = LOAD_CHARTS;
}

export class LoadChartsSuccessAction implements Action {
  readonly type = LOAD_CHARTS_SUCESS;
  constructor(public payload: ChartInterface[]) {}
}

export class LoadChartsFailAction implements Action {
  readonly type = LOAD_CHARTS_FAIL;
  constructor(public payload: any) {}
}

export const DATERANGE_CHANGE = '[Products] Daterange Changed';
export const DATERANGE_CHANGE_SUCCESS = '[Products] Daterange Changed Success';
export const DATERANGE_CHANGE_FAIL = '[Products] Daterange Changed Fail';

export class DateRangeChangeAction implements Action {
  readonly type = DATERANGE_CHANGE;
  constructor(public payload: Date[]) {}
}

export class DateRangeChangeSuccessAction implements Action {
  readonly type = DATERANGE_CHANGE_SUCCESS;
  constructor(public payload: ChartInterface[]) {}
}

export class DateRangeChangeFailAction implements Action {
  readonly type = DATERANGE_CHANGE_FAIL;
  constructor(public payload: any) {}
}

export const ADD_CHART = '[Products] Add Chart';
export const ADD_CHART_SUCCESS = '[Products] Add Chart Success';
export const ADD_CHART_FAIL = '[Products] Add Chart Fail';

export class AddChartAction implements Action {
  readonly type = ADD_CHART;
  constructor(public payload: ChartInterface) {}
}

export class AddChartSuccessAction implements Action {
  readonly type = ADD_CHART_SUCCESS;
  constructor(public payload: ChartInterface) {}
}

export class AddChartFailAction implements Action {
  readonly type = ADD_CHART_FAIL;
  constructor(public payload: any) {}
}

export const REMOVE_CHART = '[Products] REMOVE Chart';
export const REMOVE_CHART_SUCCESS = '[Products] REMOVE Chart Success';
export const REMOVE_CHART_FAIL = '[Products] REMOVE Chart Fail';

export class RemoveChartAction implements Action {
  readonly type = REMOVE_CHART;
  constructor(public payload: number) {}
}

export class RemoveChartSuccessAction implements Action {
  readonly type = REMOVE_CHART_SUCCESS;
  constructor(public payload: number) {}
}

export class RemoveChartFailAction implements Action {
  readonly type = REMOVE_CHART_FAIL;
  constructor(public payload: any) {}
}

export const UPDATE_CHART = '[Products] UPDATE Chart';
export const UPDATE_CHART_SUCCESS = '[Products] UPDATE Chart Success';
export const UPDATE_CHART_FAIL = '[Products] UPDATE Chart Fail';

export class UpdateChartAction implements Action {
  readonly type = UPDATE_CHART;
  constructor(public payload: ChartInterface) {}
}

export class UpdateChartSuccessAction implements Action {
  readonly type = UPDATE_CHART_SUCCESS;
  constructor(public payload: ChartInterface) {}
}

export class UpdateChartFailAction implements Action {
  readonly type = UPDATE_CHART_FAIL;
  constructor(public payload: any) {}
}
export type LoadChartsActions =
  | LoadChartsAction
  | LoadChartsFailAction
  | LoadChartsSuccessAction
  | DateRangeChangeAction
  | DateRangeChangeFailAction
  | DateRangeChangeSuccessAction
  | AddChartAction
  | AddChartFailAction
  | AddChartSuccessAction
  | RemoveChartAction
  | RemoveChartFailAction
  | RemoveChartSuccessAction
  | UpdateChartAction
  | UpdateChartFailAction
  | UpdateChartSuccessAction;
