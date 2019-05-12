import { EUserActions } from '@store/actions/user.actions';
import { UserActions } from '@store/actions/user.actions';
import { initialUserState } from '@store/state/user.state';
import { IUser } from '@models/user.interface';

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
