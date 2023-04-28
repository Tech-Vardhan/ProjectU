import { Ingredient } from '../../Shared/ingredient.model';
import * as ShoppingListAction from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: any;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('tomato', 5), new Ingredient('potato', 5)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state: State = initialState, action: any) {
  switch (action.type) {
    case ShoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListAction.UPDATE_INGREDIENTS:
      const ingredient = state.ingredients[state.editedIngredientIndex];

      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };

      const updatedIngredients = [...state.ingredients];
      updatedIngredient[state.editedIngredientIndex] = updatedIngredients;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null,
      };

    case ShoppingListAction.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListAction.STOP_EDIT:
      return {
        ...state,
        // editedIngredient: null,
        // editedIngredientIndex: -1,
      };
    default: {
      return state;
    }
  }
}
