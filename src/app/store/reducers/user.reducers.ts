import { EUserActions } from '@store/actions/user.actions';
import { UserActions } from '@store/actions/user.actions';
import { UserState } from '@store/state/user.state';
import { IUser } from '@models/user.interface';

export const userReducers = (state = UserState, action: UserActions): IUser => {
  switch (action.type) {
    case EUserActions.SetUser: {
      return {
        ...action.payload
      };
    }
    case EUserActions.RemoveUser:
      return UserState;

    default:
      return state;
  }
};
