import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeAction from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(state = initialState, action: any) {
  switch (action.type) {
    case RecipeAction.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
  }
}
