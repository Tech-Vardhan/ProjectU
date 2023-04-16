import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopingListService {
  ingrediantChanged = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('tomato', 5),
    new Ingredient('potato', 5),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }
  //Shopping list edit
  getIngredients(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingrediantChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingrediantChanged.next(this.ingredients.slice());
  }
  deleteIngredients(index: number) {
    // splice start from one point and Remove it
    this.ingredients.splice(index, 1);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  constructor() {}
}
