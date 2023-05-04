import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ProjectU';
  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
