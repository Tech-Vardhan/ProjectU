import { Ingredient } from '../../Shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

const initialState = {
  ingredients: [new Ingredient('tomato', 5), new Ingredient('potato', 5)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListAction.AddIngredient
) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    default: {
      return state;
    }
  }
}
