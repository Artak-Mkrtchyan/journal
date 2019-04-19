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

export function userAuth(state:IUser = initialState, action: Action) {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN', action);
      return {
        id: '',
        name: '',
        email: '',
        token: ''
      };
    default:
      return state;
  }
}


export class SetToken implements Action {
  readonly type = 'LOGIN';

  constructor(public user: {id: string, name: string, email: string, token: string}) {}
}
