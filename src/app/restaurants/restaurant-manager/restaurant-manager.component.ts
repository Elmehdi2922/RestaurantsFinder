import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
@Component({
  selector: 'app-restaurant-manager',
  templateUrl: './restaurant-manager.component.html',
  styleUrls: ['./restaurant-manager.component.css']
})
export class RestaurantManagerComponent implements OnInit {

  @Input() selectedRestau: Restaurant = {
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
  @Input() action: string;

  restaurantForm: any;
  isSubmit: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    public activeModal: NgbActiveModal) {
    this.restaurantForm = FormGroup;
  }

  ngOnInit(): void {

    this.restaurantForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      street: ['', Validators.required],
      borough: ['', Validators.required],
      cuisine: ['', Validators.required],
      grade: ['', Validators.required],
      score: [0, Validators.required],
      lat: [0, Validators.required],
      lng: [0, Validators.required],
      url: ['', Validators.required],
    });
  }


  onSubmit() {
    console.log("submit");
    const id = this.selectedRestau._id;
    this.selectedRestau = this.restaurantForm.value;

    if (this.action == "add") {
      let x = this.restaurantService
        .addOne(this.selectedRestau)
        .subscribe(
          (res: any) => { console.log("add response :"); console.log(res); }
        );
    }
    if (this.action == "edit") {
      this.selectedRestau._id = id;
      let x = this.restaurantService
        .updateOne(this.selectedRestau)
        .subscribe(
          (res: any) => { console.log("edit response :"); console.log(res); }
        );
    }
    if (this.action == "delete") {
      this.selectedRestau._id = id;
      let x = this.restaurantService
        .deleteOne(this.selectedRestau)
        .subscribe(
          (res: any) => { console.log("delete response :"); console.log(res); }
        );
    }

    this.restaurantForm.reset();
    this.isSubmit = true;
    setTimeout(
      function () {
        this.isSubmit = true;
      }, 3000);
    this.action = "add";
    this.activeModal.dismiss('Cross click')
  }
}
