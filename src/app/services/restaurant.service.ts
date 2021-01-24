import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  _HEADER = { 
    'cache-control': 'no-cache',
    'x-apikey': environment.X_APIKEY, 
    'content-type': 'application/json' 
  };
  constructor(private http: HttpClient) { }


  getAll(): any {
    return this.http
      .get(
            "https://restaurantsfinder-9290.restdb.io/rest/restaurant",
            {headers: this._HEADER}
          )
      .pipe(
        map(res => res)
      );
  }

  findById( id: number): any {
 
     return this.http
       .get(
         "https://restaurantsfinder-9290.restdb.io/rest/restaurant/"+id,
         { headers: this._HEADER }
       )
       .pipe(
         map(res => res)
       ); 
   }
  
  getByFiltre(restau: { name: string, address: string }): any {
    return this.http
      .get(
            "https://restaurantsfinder-9290.restdb.io/rest/restaurant",
            { headers: this._HEADER }
          )
      .pipe(
            map(res => res),
            filter(
                (data: Restaurant) =>
                (
                  (data.name.indexOf(restau.name) > -1 && restau.name !== "") ||
                  (data.borough.indexOf(restau.address) > -1 && restau.address !== "")
                )
              )
            );
  }
  
  addOne(restau: Restaurant): any { 
    return this.http
      .post(
            "https://restaurantsfinder-9290.restdb.io/rest/restaurant", 
            restau,
            {headers: this._HEADER}
            )
      .pipe(
              map(res => res)
            );
  }

  deleteOne(restau: Restaurant) {
     return this.http
      .delete(
              "https://restaurantsfinder-9290.restdb.io/rest/restaurant/" + restau._id,
              { headers: this._HEADER }
            ) 
      .pipe(
              map(res => res)
            );
  }

  updateOne(restau: Restaurant) {
    return this.http
      .put(
        "https://restaurantsfinder-9290.restdb.io/rest/restaurant/"+restau._id,
        restau,
        { headers: this._HEADER }
      )
      .pipe(
        map(res => res)
      );
  }
}
