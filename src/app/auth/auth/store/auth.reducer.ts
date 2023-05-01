import { Action } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
export interface State {
  user: any;
}
// const initialState: State = {
//     user: new User('', '', '', null),
//   };

const intialState: State = {
  user: null,
};

export function authReducer(state = intialState, action: any) {
  switch (action.type) {
    case action.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        user: user,
      };

    case action.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
