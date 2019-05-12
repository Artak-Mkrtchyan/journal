import { createSelector } from '@ngrx/store';

import { IAppState } from '@store/state/app.state';
import { IUser } from '@models/user.interface';

const User = (state: IAppState) => state.user;

export const selectUser = createSelector(
  User,
  (state: IUser) => state
);

