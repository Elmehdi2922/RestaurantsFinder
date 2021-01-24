import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() restaurants: any[] = [];
  @Input() lat: number = 31.5109424;
  @Input() lng: number = -9.7800518;
  @Input() zoom: number = 14;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.restaurants);
  }

  getStars(nombre : number): string
  {
    let etoile ="";
    for (let i = 0; i < nombre; i++) { etoile = etoile +"⭐";}
    return etoile;
  }

  seeMore(restau : Restaurant)
  {
    this.router.navigate(['/seeMore', restau._id]);
  }
  
  

}
