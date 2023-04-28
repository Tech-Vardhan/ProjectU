import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, startWith } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from 'src/app/shopping-list/store/shopping-list.action';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  editedItem!: Ingredient;

  constructor(
    private slService: ShopingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngrediant = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredients(this.editItemIndex, newIngrediant);
      this.store.dispatch(
        new ShoppingListAction.UpdateIngredient(newIngrediant)
      );
    } else {
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngrediant));
      // this.slService.addIngredient(newIngrediant);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {
    this.onClear();
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    // this.slService.deleteIngredients(this.editItemIndex);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }
}
