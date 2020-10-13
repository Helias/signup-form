import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from 'ngx-typesafe-forms';
import { SignupService } from './services/signup-service/signup.service';
import { FormFactoryService } from './services/form-factory/form-factory.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Profile } from './utils/profile.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnDestroy {

  constructor(
    private signupService: SignupService,
    private formFactoryService: FormFactoryService,
  ) { }

  private destroy$ = new Subject();
  loading = false;
  finishLoading = false;

  private _signupForm = this.formFactoryService.createSignupForm();

  get signupForm(): FormGroup<Profile> {
    return this._signupForm;
  }

  get firstName(): FormControl<string> {
    return this._signupForm.get('firstName') as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this._signupForm.get('lastName') as FormControl<string>;
  }

  get email(): FormControl<string> {
    return this._signupForm.get('email') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this._signupForm.get('password') as FormControl<string>;
  }

  submitForm(): void {
    this.loading = true;

    this.signupService.signUp({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      // password: this.password.value, // as requirements say. the password should not be part of the post request
    }).pipe(
      takeUntil(this.destroy$)
    ).subscribe(t => {
      this.loading = false;
      this.finishLoading = true;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
