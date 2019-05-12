import { ActionReducerMap } from '@ngrx/store';

import { IAppState } from '@store/state/app.state';
import { playerReducers } from '@store/reducers/player.reducers';
import { userReducers } from '@store/reducers/user.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  // router: routerReducer,
  user: userReducers,
  player: playerReducers
};
