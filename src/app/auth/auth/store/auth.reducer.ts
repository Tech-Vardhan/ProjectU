import { Action } from '@ngrx/store';
import { User } from '../user.model';

export interface State {
  user: User | null;
}
// const initialState: State = {
//     user: new User('', '', '', null),
//   };

const intialState: State = {
  user: null,
};

export function authReducer(state = intialState, action : Action) {
  return state;
}
