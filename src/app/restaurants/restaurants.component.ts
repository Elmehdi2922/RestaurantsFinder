import { Component, OnInit, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantManagerComponent } from './restaurant-manager/restaurant-manager.component';
 
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: any[] = [];
  allData: any[] = [];

  //pour Recharche
  dataSearching: any[] = [];
  isSearching=false;

  //pour Map
  mapRestaurants: any[] = [];
  lat: number = 31.5109424;
  lng: number = -9.7800518;
  zoom: number = 14;

  //pour pagination & nombre d element par page
  page: number = 1;
  pageSize: number = 4;
  collectionSize: number =0 ;

  //pour gestion des Restaurants (CRUD) 
  isSubmit: boolean = false;
  action: string = "add";
  selectedRestau: Restaurant = {
    _id: '',
    name: '',
    street: '',
    borough: '',
    cuisine: 'Marocainne',
    grade: 'D',
    score: 0,
    lat: 0,
    lng: 0,
    url: '',
  };

  constructor(private restaurantService: RestaurantService ,private modalService: NgbModal) {
 
  }

  ngOnInit(): void {
    this.Loader(); 
  }

  //pour remplir la list
  Loader()
  {
    this.restaurants=[];
    this.isSearching=false;
    this.restaurantService.getAll()
    .subscribe(
      (res: Restaurant[]) => {
          console.log(res);
          this.allData = res;
          this.restaurants= res;
          this.refreshRestaurantsPaginated();
        }
      ); 
  }

  //gestion des restaurants appelé par output du list
  //affiche soit modal pour CRUD soit localisation exact d'une restaux apartir du list
  onSelectedRestaurant(element :{ action: string, restaurant: Restaurant })
  {
    console.log("selected Restau is : " );
    console.log( element.restaurant);
    switch (element.action) {
      case 'delete': 
      {
        this.action = 'delete';
        this.selectedRestau = element.restaurant; 
        const modalRef = this.modalService.open(RestaurantManagerComponent)
        modalRef.componentInstance.action = "delete";
        modalRef.componentInstance.selectedRestau = this.selectedRestau;
        modalRef.result.then(
        result => {
            this.Loader();
            this.isSubmit=true;
            console.log('Save click');
            modalRef.close();
          },
          reason => {
            this.isSubmit= false;
          }
        );
          
        break;
      }
      case 'edit': 
      {
        this.action = 'edit';
        this.selectedRestau = element.restaurant; 
        
          const modalRef = this.modalService.open(RestaurantManagerComponent)
        modalRef.componentInstance.action = "edit";
        modalRef.componentInstance.selectedRestau = this.selectedRestau;
        modalRef.result.then(
          result => {
            this.Loader();
            this.isSubmit = true;
            console.log('Save click');
            modalRef.close();
          },
          reason => {
            this.isSubmit = false;
          }
        );
        break;
      }
      case 'add':
      {
        this.action = 'add';
        const modalRef = this.modalService.open(RestaurantManagerComponent);
        modalRef.componentInstance.action = "add";
        modalRef.componentInstance.selectedRestau = this.selectedRestau;
        modalRef.result.then(
          result => {
            this.Loader();
            this.isSubmit = true;
            console.log('Save click');
            modalRef.close();
          },
          reason => {
            this.isSubmit = false;
          }
        );
        break;
      }    
      default: 
      {
        //afficher localisation exact d'une restaurant
        this.lat = element.restaurant.lat;
        this.lng = element.restaurant.lng;
        this.zoom = 20;
        break;
      }
    } 
  }
 
  //pour Recharche
  searchRestaurant(restau : {name:string,address:string})
  { 
    
    this.restaurants=this.allData;
    
    this.dataSearching = this.allData
      .filter(
        (data: Restaurant) =>
        (
          (data.name.indexOf(restau.name) > -1 && restau.name !== "") ||
          (data.borough.indexOf(restau.address) > -1 && restau.address !== "")
        )
      );
    if (this.dataSearching.length==0){
      this.restaurants = this.allData;
      this.isSearching= false;
    }else{
      this.restaurants = this.dataSearching;
      this.isSearching = true;
    }
    this.collectionSize = this.restaurants.length;

    this.refreshRestaurantsPaginated();
  }

  //pour Pagination
  refreshRestaurantsPaginated() {
    let data=this.allData;
    if(this.isSearching==true)
    {
      data=this.dataSearching;
    }
    this.mapRestaurants=data;
    this.collectionSize=data.length;
    console.log('isSearching=' + this.isSearching);
    console.log(data);
    this.restaurants = data
      .map((res, i) => ({ id: i + 1, ...res }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
