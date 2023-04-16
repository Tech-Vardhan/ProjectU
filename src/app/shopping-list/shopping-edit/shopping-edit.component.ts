import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShopingListService } from '../shoping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode: boolean = false;
  editItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShopingListService) {}

  ngOnInit() {
    this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredients(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngrediant = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredients(this.editItemIndex, newIngrediant);
    } else {
      this.slService.addIngredient(newIngrediant);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.onClear();
    this.slService.deleteIngredients(this.editItemIndex)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
