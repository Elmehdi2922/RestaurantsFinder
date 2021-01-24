import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  authStatus: boolean = false;
  authForm: any;
  login: String = "admin";
  pass: String = "admin";
  show: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.authForm = FormGroup;
  }

  ngOnInit() {
    this.initForm();
    this.authStatus = this.authService.isAuth;
  }

  initForm() {
    this.authForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      pass: ['', Validators.required]
    });
  }

  connect() {
    const form = this.authForm.value;
    this.login = form['login'];
    this.pass = form['pass'];

    this.authService.signIn(this.login, this.pass).then(
      () => {
        this.authStatus = this.authService.isAuth;
        this.show = true;
        setTimeout(function () {

        }, 4000);

        this.router.navigate(['home']);
      }
    );
  }

}
