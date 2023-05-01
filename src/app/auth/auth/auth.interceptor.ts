import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable, take, exhaustMap, map } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isAuthenticated = false;
  constructor(
    private authService: AuthService,
    public store: Store<fromApp.AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      map((authState) => {
        return authState.user;
      }),
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const ModifiedReq = request.clone({
          params: new HttpParams().set('auth', user.token),
        });

        return next.handle(ModifiedReq);
      })
    );
  }
}
