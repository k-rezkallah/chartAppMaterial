import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromRouterReducer from '@ngrx/router-store';

export interface RouterUrlState {
  url: string;
  queryParams: Params;
  params: Params;
}

// set the router state
export interface State {
  routerReducer: fromRouterReducer.RouterReducerState<RouterUrlState>;
}

//set the reducer
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouterReducer.routerReducer,
};

// selectors: get the Router State
export const getRouterState =
  createFeatureSelector<fromRouterReducer.RouterReducerState<RouterUrlState>>(
    'routerReducer'
  );

// selector: get the url state
export const getUrlState = createSelector(
  getRouterState,
  (state) => state.state
);

// selector: getUrl
export const getUrl = createSelector(getUrlState, (state) => state.url);
// selector: getUrl
export const getParams = createSelector(getUrlState, (state) => state.params);
// selector: getUrl
export const getQueryParams = createSelector(
  getUrlState,
  (state) => state.queryParams
);

// serializer
export class CustomSerializer
  implements fromRouterReducer.RouterStateSerializer<RouterUrlState>
{
  serialize(routerState: RouterStateSnapshot): RouterUrlState {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    // get the last peace of the router
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
