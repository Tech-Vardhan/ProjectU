import { Component, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  ingredients: Observable<{ ingredients: Ingredient[] }> = new Observable<{
    ingredients: Ingredient[];
  }>();
  private inChangSub!: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredient();
    // this.inChangSub = this.slService.ingrediantChanged.subscribe(
    //   (ingredient: Ingredient[]) => {
    //     this.ingredients = ingredient;
    //   }
    // );
  }
  onEditItem(index: number) {
    // this.slService.startEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  // ngOnDestroy(): void {
  //   this.inChangSub.unsubscribe();
  // }
}
