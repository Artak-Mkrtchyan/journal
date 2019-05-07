import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { playerReducers } from './player.reducers';
import { userReducers } from './user.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  // router: routerReducer,
  user: userReducers,
  player: playerReducers
};
