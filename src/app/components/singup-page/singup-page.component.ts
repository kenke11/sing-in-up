import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator, MyValidators} from './my.validators';
import {HttpClient} from '@angular/common/http';

export interface GeorgianCity {
  name_ka: string;
  name_en: string;
  location?: number;
  id?: number;
}

@Component({
  selector: 'app-singup-page',
  templateUrl: './singup-page.component.html',
  styleUrls: ['./singup-page.component.scss']
})
export class SingupPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  georgianCitys: GeorgianCity[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      personalNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(11)
      ]),
      birthday: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        MyValidators.existingEmails
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      geoCity: new FormGroup({
        city: new FormControl('tbilisi')
      }),
      gender: new FormGroup({
        gender: new FormControl('male')
      })
    }, {
      validators: ConfirmedValidator('password', 'confirmPassword')
    });

  }


  // tslint:disable-next-line:typedef
  singin(){
    console.log(this.form.value);
    this.form.reset();
  }

}
