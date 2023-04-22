import { NgModule } from '@angular/core';
import { ShopingListService } from './shopping-list/shoping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth/auth.interceptor';

@NgModule({
  providers: [
    ShopingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
