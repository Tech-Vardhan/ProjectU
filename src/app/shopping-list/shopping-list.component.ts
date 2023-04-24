import { Component, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShopingListService } from './shoping-list.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnDestroy {
  ingredients!: Ingredient[];
  private inChangSub!: Subscription;

  constructor(
    private slService: ShopingListService,
    private store: Store<shoppingList>
  ) {}
  ngOnInit() {
    this.ingredients = this.slService.getIngredient();
    this.inChangSub = this.slService.ingrediantChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }
  onEditItem(index: number) {
    this.slService.startEditing.next(index);
  }

  ngOnDestroy(): void {
    this.inChangSub.unsubscribe();
  }
}
