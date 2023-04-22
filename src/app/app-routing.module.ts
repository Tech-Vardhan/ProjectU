import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.shoppingListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy : PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
