import { Action } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';
export interface State {
  user: any;
  authError: string;
  loading: boolean;
}
// const initialState: State = {
//     user: new User('', '', '', null),
//   };

const intialState: State = {
  user: null,
  authError: '',
  loading: false,
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
        authError: '',
        user: user,
        loading: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: '',
        loading: true,
      };

    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
