import { EUserActions } from '../actions/user.actions';
import { UserActions } from '../actions/user.actions';
import { initialUserState } from '../state/user.state';
import { IUser } from 'src/app/models/user.interface';

export const userReducers = (
  state = initialUserState,
  action: UserActions
): IUser => {
  switch (action.type) {
    case EUserActions.SetUser: {
      return {
        ...action.payload
      };
    }
    case EUserActions.RemoveUser:
      return initialUserState;

    default:
      return state;
  }
};
