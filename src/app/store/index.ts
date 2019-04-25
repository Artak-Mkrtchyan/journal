import { Action } from '@ngrx/store';

interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  token: ''
};

export function userAuth(state: IUser = initialState, action: UserToken) {
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

export class RemoveToken implements Action {
  readonly type = 'LOGOUT';
}


export class SetToken implements Action {
  readonly type = 'LOGIN';

  constructor(public payload: {id: string, name: string, email: string, token: string}) {}
}

type UserToken = SetToken | RemoveToken;
