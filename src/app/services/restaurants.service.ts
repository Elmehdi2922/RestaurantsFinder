import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  
  restaurants: Restaurant[] =[];/* [{
    lat: 31.50574152641768, lng: -9.763535551561295, street: "Avenu Mohamed V", borough: "Essaouira", cuisine: "Japonaise", grade: "B", score: 3, name: "Sushi Murex", url: 'https://lh5.googleusercontent.com/p/AF1QipO9DU_cBLf4OlZRfRJEdtVBeDkdl27Gu5nyPCk4=w426-h240-k-no'
  },{
    lat: 31.50566580378508, lng: -9.763586733101425, street: "Avenu Mohamed V", borough: "Essaouira", cuisine: "Asiatique", grade: "A", score: 4, name: "Yugo Cuisine", url: 'https://lh5.googleusercontent.com/p/AF1QipOQruEj9gTOT8Gc19m1yS-k4UNkDfzyz9sMzPcR=w408-h306-k-no'
  },{
    lat: 31.503936416003747, lng: -9.76340253440614, street: "60 Avenu Mohamed V", borough: "Essaouira", cuisine: "Marocainne", grade: "A", score: 3, name: "The Roof Top", url: 'https://lh5.googleusercontent.com/p/AF1QipNPQh9bhzH6laTCvMrw1BD2DQX_JbxLNXEwGdc7=w408-h272-k-no'
  },{
    lat: 31.50594968067014, lng: -9.760792962014431, street: "40, Avenue Al Aqaba, 41 Avenue Princesse Lalla Amina", borough: "Essaouira", cuisine: "Polivalante", grade: "C", score: 4, name: "Platinium City&Friends", url: 'https://lh5.googleusercontent.com/p/AF1QipPNLYYMaAkZl8pBNd7V2-xxKhcSntXyuQ8Uxhqh=w408-h272-k-no'
  },{
    lat: 31.50581262657775, lng: -9.760963759908625, street: "42 Avenue Princesse Lalla Amina", borough: "Essaouira", cuisine: "Restaurant", grade: "B", score: 5, name: "D’un goût à l’autre", url: 'https://lh5.googleusercontent.com/p/AF1QipPNLYYMaAkZl8pBNd7V2-xxKhcSntXyuQ8Uxhqh=w408-h272-k-no'
  },{
    lat: 31.507981435809505, lng: -9.766096577443037, street: "Avenu Mohamed V Essaouira", borough: "Essaouira", cuisine: "Polonaise", grade: "B", score: 2, name: "Bar Miramar", url: 'https://lh5.googleusercontent.com/p/AF1QipOoQVL0eXju2K9eG858UcUzZgZ9XkZedRpKpRLs=w408-h306-k-no'
  },{
    lat: 31.51310846448968, lng: -9.769824728843929, street: "39 Av istiklal", borough: "Essaouira", cuisine: "Restaurant", grade: "A", score: 4, name: "Mega Loft OthmanChic", url: 'https://lh5.googleusercontent.com/p/AF1QipNgpBON1E5_MppuDvER7RWj7aC9hlF-xisTiGdi=w408-h306-k-no'
  },{
    lat: 31.512191494481304, lng: -9.772158839084144, street: "Place Moulay Hassan", borough: "Essaouira", cuisine: "Restaurant", grade: "A", score: 4, name: "Taros", url: 'https://lh5.googleusercontent.com/p/AF1QipOwroYFmJIaUZ2_iANIMUvOG72yfUPRTDOVlStx=w408-h272-k-no'
  },{
    lat: 31.50448932478101, lng: -9.762767652108282, street: "Essaouira", borough: "Essaouira", cuisine: "Italienne", grade: "A", score: 4, name: "Gusto Italia", url: 'https://lh5.googleusercontent.com/p/AF1QipPw9jlIYIt-tLo1p2yvy4KiOUr4VClUJ6814sm8=w472-h240-k-no'
  },{
    lat: 31.630300109282313, lng: -8.007132838780262, street: "Rue oummo El banine, N1", borough: "Marrakech", cuisine: "Japonaise", grade: "A", score: 5, name: "Zatchi sushi", url: 'https://lh5.googleusercontent.com/p/AF1QipPw9jlIYIt-tLo1p2yvy4KiOUr4VClUJ6814sm8=w472-h240-k-no'
  }];*/

  constructor(private restaurantService: RestaurantService) { }


  fillLocalStoage()
  {
    /*if (localStorage.getItem("restaurant") !== null) 
    {
      localStorage.setItem("restaurant", JSON.stringify(this.restaurants));
      console.log('restaurant created!');
    }else{
      console.log('restaurant exist!');
    }*/
  }

  loadingList()
  {
    this.restaurants = [];
    this.restaurantService.getAll().subscribe((res: any[]) => {
      this.restaurants = res;
      console.log(res);
    });
    
  }

  getAll(): Restaurant[] { 
    
    //this.restaurants = JSON.parse(<string>localStorage.getItem("restaurant"));
    this.restaurants = [];
    this.restaurantService.getAll().subscribe((res: any[]) => {
      this.restaurants = res;
    });
    return this.restaurants;
  }

  findByLocalisation(lat: number,lng: number) : Restaurant
  {
    let myRestaurant: Restaurant[]=[]; 

    myRestaurant = this.getAll().filter((data: Restaurant) =>(data.lat == lat && data.lng == lng));

    console.log("Restaurant :");console.log(myRestaurant);console.log("___________"); 
    
    return myRestaurant[0];
  }

  getByFilter(restau: { name: string, address: string }): Restaurant[]{
    let restaurantList:  Restaurant[]=[];
 
    restaurantList = this.getAll().filter(
        (data: Restaurant) =>
        (
          (data.name.indexOf(restau.name) > -1 && restau.name !== "") ||
          (data.borough.indexOf(restau.address) > -1 && restau.address !== "")
        )
      ); 
  
    if(restaurantList.length==0){
      return this.getAll();
    }
    return restaurantList;
  }

  addOne(restaurant : Restaurant): void 
  {
    this.restaurants = this.getAll();
    this.restaurants.push(restaurant);
     
    localStorage.setItem("restaurant", JSON.stringify(this.restaurants));
    console.log("added !!!!!");

  }

}
