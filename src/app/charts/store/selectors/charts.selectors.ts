import { createSelector } from '@ngrx/store';
import { ChartInterface } from '../../models/chart.model';

import * as fromFeature from '../reducers';
import * as fromCharts from '../reducers/charts.reducer';

// get charts state
export const getChartsState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.charts
);

// get Entities === Charts as Objects
export const getChartsEntities = createSelector(
  getChartsState,
  fromCharts.getChartsEntities
);
// get Entities === Charts as Table
export const getAllCharts = createSelector(
  getChartsEntities,
  (entities: { [id: number]: ChartInterface }) =>
    Object.keys(entities).map((id) => entities[parseInt(id, 10)])
);

export const getChartsIsLoaded = createSelector(
  getChartsState,
  fromCharts.getChartsIsLoaded
);

export const getChartsIsLoading = createSelector(
  getChartsState,
  fromCharts.getChartsIsLoading
);

// fromDate Selector
export const getFromToDate = createSelector(
  getChartsState,
  fromCharts.getFromToDate
);

// fromDate Selector
export const getFromDate = createSelector(
  getChartsState,
  fromCharts.getFromDate
);

// toDate Selector
export const getToDate = createSelector(getChartsState, fromCharts.getToDate);

// isChanged Selector
export const isChangedDate = createSelector(
  getChartsState,
  fromCharts.getIsChangedDate
);
