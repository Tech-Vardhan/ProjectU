import { Component } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShopingListService } from './shoping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  ingredients!: Ingredient[];

  constructor(private slService: ShopingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredient();
    this.slService.ingrediantChanged.subscribe(
      (ingredient : Ingredient[] ) => {
         this.ingredients = ingredient
      }
    )
  }
}
