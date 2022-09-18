import * as fromCharts from './charts.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

// Wrap and export this Module State
export interface ProductsState {
  charts: fromCharts.ChartsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  charts: fromCharts.reducer,
};

// for selectors
export const getProductsState =
  createFeatureSelector<ProductsState>('products');
