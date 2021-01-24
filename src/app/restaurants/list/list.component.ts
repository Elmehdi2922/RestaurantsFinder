import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() restaurants: any[] = [];
  @Input() isLoading: boolean = true;
  
  @Output() selectedRestaurant = new EventEmitter<{action :string,restaurant:Restaurant}>();
  
  
  restaurant: Restaurant = {
    _id: '',
    name: '',
    street: '',
    borough: '',
    cuisine: '',
    grade: '',
    score: 0,
    lat: 0,
    lng: 0,
    url: '',
  };
  
  constructor() { }

  ngOnInit(): void {
    
  }
 
  getStars(nombre: number): string {
    let etoile = "";
    for (let i = 0; i < nombre; i++) { etoile = etoile + "⭐"; }
    return etoile;
  }

  onClick(action: string, restaurant: Restaurant) 
  {
    this.selectedRestaurant.emit({ action: action, restaurant: restaurant });
  }
}
