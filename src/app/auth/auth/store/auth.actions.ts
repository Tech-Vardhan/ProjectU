import { Action } from '@ngrx/store';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTCATION_SUCCESS = '[Auth] AuthenticationSuccess';
export const AUTHENTICATION_FAIL = '[Auth] AuthencationFail';
export const LOGOUT = '[Auth Logout';

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTCATION_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthencationFail implements Action {
  readonly type = AUTHENTICATION_FAIL;

  constructor(public payload: string) {}
}
export type AuthActions =
  | AuthenticationSuccess
  | Logout
  | LoginStart
  | AuthencationFail;
