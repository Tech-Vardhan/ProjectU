import { Ingredient } from '../../Shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State; 
}

const initialState: State = {
  ingredients: [new Ingredient('tomato', 5), new Ingredient('potato', 5)],
  editedIngredient: new Ingredient('', 0),
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: any) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }

    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    default: {
      return state;
    }

    case ShoppingListAction.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[action.payload.index];

      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredient[action.payload.index] = updatedIngredients;

      return {
        ...state,
        ingredients: updatedIngredients,
      };

    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        }),
      };
  }
}
