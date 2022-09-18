import { environment } from 'src/environments/environment';
import { ChartInterface } from '../../models/chart.model';
import * as fromChartsActions from '../actions/charts.actions';

export interface ChartsState {
  isLoading: boolean;
  isLoaded: boolean;
  entities: { [id: number]: ChartInterface };
  isChangedDate: boolean;
  dateFilter: {
    from: Date;
    to: Date;
  };
}

export const initialState: ChartsState = {
  isLoading: false,
  isLoaded: false,
  entities: {},
  dateFilter: {
    from: new Date(environment.initialDateRange.from),
    to: new Date(environment.initialDateRange.to),
  },
  isChangedDate: false,
};

export function reducer(state = initialState, action: any): ChartsState {
  switch (action.type) {
    case fromChartsActions.LOAD_CHARTS: {
      return { ...state, isLoading: true, isLoaded: false };
    }
    case fromChartsActions.LOAD_CHARTS_SUCESS: {
      const charts = action.payload;
      const entities = charts.reduce(
        (entities: { [id: number]: ChartInterface }, chart: ChartInterface) => {
          return { ...entities, [chart.id]: chart };
        },
        { ...state.entities }
      );
      return { ...state, isLoading: false, isLoaded: true, entities };
    }
    case fromChartsActions.LOAD_CHARTS_FAIL: {
      return { ...state, isLoading: false, isLoaded: false };
    }
    case fromChartsActions.DATERANGE_CHANGE: {
      const newRange = action.payload;
      const dateFilter = {
        from: newRange[1],
        to: newRange[0],
      };
      return {
        ...state,
        dateFilter,
        isChangedDate: true,
      };
    }
    case fromChartsActions.DATERANGE_CHANGE_SUCCESS: {
      const daterangeFilter = state.dateFilter;
      const charts = action.payload;

      // filter the new dates for each chart then return the new state
      const entities = charts
        .map((chart: ChartInterface) => {
          const chartData = { ...chart.data };
          // geting the new data filtered
          const data = Object.keys(chart.data)
            .filter((key) => {
              return (
                new Date(key) > daterangeFilter.from &&
                new Date(key) < daterangeFilter.to
              );
            })
            .reduce((cur, key) => {
              return Object.assign(cur, { [key]: chartData[key] });
            }, {});

          return { ...chart, data };
        })
        .reduce((curr: ChartInterface, chart: ChartInterface) => {
          return Object.assign(curr, { [chart.id]: chart });
        }, {});

      return {
        ...state,
        entities,
      };
    }
    case fromChartsActions.ADD_CHART: {
      console.log('from inside reducer add chart');
      return state;
    }
    case fromChartsActions.ADD_CHART_SUCCESS: {
      console.log('from inside reducer add chart Success');

      const chart = action.payload;
      const entities = { ...state.entities, [chart.id]: chart };

      return {
        ...state,
        entities,
      };
    }
    case fromChartsActions.ADD_CHART_FAIL: {
      console.log('from inside reducer add chart FAIL erro', action.payload);
      return state;
    }

    case fromChartsActions.REMOVE_CHART_FAIL: {
      console.log('from inside reducer remove chart FAIL erro', action.payload);
      return state;
    }
    case fromChartsActions.REMOVE_CHART_SUCCESS: {
      const id = action.payload;

      const { [id]: removed, ...entities } = state.entities;

      return {
        ...state,
        entities,
      };
    }

    case fromChartsActions.UPDATE_CHART_FAIL: {
      console.log('from inside reducer Update chart FAIL erro', action.payload);
      return state;
    }
    case fromChartsActions.UPDATE_CHART_SUCCESS: {
      let updatedChart = action.payload;

      const entities = { ...state.entities, [updatedChart.id]: updatedChart };

      return {
        ...state,
        entities,
      };
    }
  }
  return state;
}

// getters of state properties
export const getChartsEntities = (state: ChartsState) => state.entities;
export const getChartsIsLoaded = (state: ChartsState) => state.isLoaded;
export const getChartsIsLoading = (state: ChartsState) => state.isLoading;

export const getIsChangedDate = (state: ChartsState) => state.isChangedDate;
export const getFromDate = (state: ChartsState) => state.dateFilter.from;
export const getToDate = (state: ChartsState) => state.dateFilter.to;
export const getFromToDate = (state: ChartsState) => state.dateFilter;
