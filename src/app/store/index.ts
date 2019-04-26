import { Action } from '@ngrx/store';

interface IUser {
  id: string;
  name: string;
  email: string;
}

const initialState = {
  id: '',
  name: '',
  email: ''
};

export function userAuth(state: IUser = initialState, action: User) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...action.payload
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export class RemoveUser implements Action {
  readonly type = 'LOGOUT';
}


export class SetUser implements Action {
  readonly type = 'LOGIN';

  constructor(public payload: {id: string, name: string, email: string}) {}
}

type User = SetUser | RemoveUser;
