import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';

import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  restaurant : Restaurant=
  {
      _id:"",
      lat: 0,
      lng: 0,
      street: "nothing",
      borough: "nothing",
      cuisine: "nothing",
      grade: "nothing",
      score: 0,
      name: "nothing", 
      url:"nothing"
  };
  constructor(private route: ActivatedRoute,
              private router: Router,
              private restaurantService:RestaurantService) 
  {

  }

  ngOnInit(): void {
    const id :number = this.route.snapshot.params['id'];
    this.restaurantService.findById(id).subscribe(
      res => {
        console.log(res);
        this.restaurant = res;
      }
    ); 
  }

  goBack()
  {
    this.router.navigate(['']);
  }

}
