import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import * as fromRecipe from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromRecipe.AppState>
  ) {}
  storeRecipes() {
    const recipes = this.recipeService.getRecipe();
    this.http
      .put(
        'https://projectu-9f4c1-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  // fetchRecipe() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       return this.http.get<Recipe[]>(
  //         'https://projectu-9f4c1-default-rtdb.firebaseio.com/recipes.json',
  //         {
  //           params: new HttpParams().set('auth', user.token),
  //         }
  //       );
  //     }),
  //     map((recipes) => {
  //       return recipes.map((recipe) => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : [],
  //         };
  //       });
  //     }),
  //     tap((recipes) => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }
  // 'https://projectu-9f4c1-default-rtdb.firebaseio.com/recipes.json'

  fetchRecipe() {
    return this.http
      .get<Recipe[]>(
        'https://projectu-9f4c1-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
