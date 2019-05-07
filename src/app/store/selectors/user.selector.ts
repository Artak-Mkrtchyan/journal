import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUser } from 'src/app/models/user.interface';

const User = (state: IAppState) => state.user;

export const selectUser = createSelector(
  User,
  (state: IUser) => state
);

