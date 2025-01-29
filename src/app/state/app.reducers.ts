import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {State} from './app.state';
import * as CoreReducer from "./core/core.reducer";

export const reducers: ActionReducerMap<State> = {
  coreData: CoreReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];
