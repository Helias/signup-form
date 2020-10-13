import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from 'ngx-typesafe-forms';
import { Validators } from '@angular/forms';
import { passwordValidator } from '../../utils/password-validator';
import { Profile } from '../../utils/profile.model';

@Injectable({
  providedIn: 'root'
})
export class FormFactoryService {

  createSignupForm(): FormGroup<Profile> {
    return new FormGroup<Profile>({
      firstName: new FormControl<string>('', [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      lastName: new FormControl<string>('', [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      email: new FormControl<string>('', [
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required,
      ]),
      password: new FormControl<string>('', [
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/),
        Validators.required,
      ]),
    }, { validators: passwordValidator });
  }

}
