import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { ShopingListService } from '../shopping-list/shoping-list.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Pizza',
  //     'Extra Spice with chilly',
  //     'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg',
  //     [new Ingredient('Corn', 10), new Ingredient('Olives', 20)]
  //   ),
  //   new Recipe(
  //     'Panipuri',
  //     'All test Pani available',
  //     'https://cdn.pixabay.com/photo/2013/01/15/11/22/panipuri-74974_960_720.jpg',
  //     [new Ingredient('GreenChilly', 20), new Ingredient('Phudina ', 1)]
  //   ),
  // ];
  recipes: Recipe[] = [];
  constructor(private slService: ShopingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe() {
    return this.recipes.slice();
  }
  getRecipes(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
