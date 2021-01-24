import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthentificationComponent } from './authentification/authentification.component';
import { DetailsComponent } from './details/details.component'; 
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [

  { path: 'home', component: RestaurantsComponent },// canActivate: [AuthGuard],
  { path: 'seeMore/:id', component: DetailsComponent },
  { path: 'login', component: AuthentificationComponent },
  { path: '', canActivate: [AuthGuard], component: RestaurantsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
