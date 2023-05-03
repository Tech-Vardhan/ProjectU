import { Action } from '@ngrx/store';
export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTCATION_SUCCESS = '[Auth] AuthenticationSuccess';
export const AUTHENTICATION_FAIL = '[Auth] AuthencationFail';
export const SIGNUP_START = '[Auth] SignupStart';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

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

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticationSuccess
  | Logout
  | LoginStart
  | AuthencationFail
  | SignupStart
  | ClearError
  | AutoLogin;
