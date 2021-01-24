import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  searchForm: any; 

  @Output() searchRestau = new EventEmitter<{ name: string,address:string}>();

  constructor(private formBuilder: FormBuilder) {
    this.searchForm = FormGroup;
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['',Validators.required],
      address: ['', Validators.required]
    });
  }
  searchRestaurant() {
    console.log("nav");
    this.searchRestau.emit(this.searchForm.value);
  }

  all() {
    console.log("all");
    this.searchForm.reset()
    this.searchRestau.emit(this.searchForm.value);
  }
}
