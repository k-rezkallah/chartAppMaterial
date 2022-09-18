import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import * as routerActions from '../actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  // @Effect({ dispatch: false })
  // navigate$ = this.actions$.pipe(
  //   ofType(routerActions.GO),
  //   map((action: routerActions.Go) => action.payload),
  //   tap(({ path, query: queryParams, extras }) => {
  //     this.router.navigate(path, { queryParams, ...extras });
  //   })
  // );

  navigatee$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerActions.GO),

        map((action: routerActions.Go) => action.payload),

        tap(({ path, query: queryParams, extras }) => {
          this.router.navigate(path, { queryParams, ...extras });
        })
      );
    },
    { dispatch: false }
  );
}
