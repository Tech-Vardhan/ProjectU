import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShopingListService {
  ingrediantChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('tomato', 5),
    new Ingredient('potato', 5),
  ];

  getIngredient() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingrediantChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingrediantChanged.emit(this.ingredients.slice());
  }

  constructor() {}
}
