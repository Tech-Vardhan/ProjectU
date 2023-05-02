import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, switchMap, of, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const handelAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + 100000);
  return new AuthActions.AuthenticationSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};
const handleError = (errorRes: any) => {
  let errorMessage = 'An Unknown error Occured!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthencationFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The Email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'The Email does not exists';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The Password not correct';
      break;
  }
  return of(new AuthActions.AuthencationFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.fireBaseApiKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecuredToken: true,
            }
          )
          .pipe(
            map((resData) => {
              // const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
              const expirationDate = new Date(new Date().getTime() + 100000);
              return handelAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTCATION_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
