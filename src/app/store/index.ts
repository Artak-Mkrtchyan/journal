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

export function userAuth(state:IUser = initialState, action: Action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: 'dasdas'
      };
    default:
      return state;
  }
}
