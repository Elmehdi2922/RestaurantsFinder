import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ListComponent } from './restaurants/list/list.component';
import { MapComponent } from './restaurants/map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailsComponent } from './details/details.component'; 
import { AuthentificationComponent } from './authentification/authentification.component';
import { RestaurantManagerComponent } from './restaurants/restaurant-manager/restaurant-manager.component';
import { RestaurantsService } from './services/restaurants.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    ListComponent,
    MapComponent,
    NavbarComponent,
    DetailsComponent, 
    AuthentificationComponent, RestaurantManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCmU70DP_yg1U2vVsjiQj5btcWmQC6d5Nc'
    }),
    ReactiveFormsModule,
    FormsModule,
    NgbModule 
  ],
  providers: [
    AuthService,
    AuthGuard,
    RestaurantsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
