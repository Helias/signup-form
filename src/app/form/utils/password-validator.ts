import { ValidationErrors } from '@angular/forms';
import { FormGroup } from 'ngx-typesafe-forms';
import { Profile } from './profile.model';

// if str contains one word of "field"
export function contains(str: string, field: string): boolean {
  str = str.toLowerCase();
  return field.toLowerCase().split(' ').some((f: string) => str.indexOf(f) > -1);
}

export function passwordValidator(fg: FormGroup<Profile>): ValidationErrors {
  const firstName = fg.get('firstName').value;
  const lastName = fg.get('lastName').value;
  const password = fg.get('password').value;
  const errors = {
    firstName: false,
    lastName: false,
  };

  if (!!firstName && !!password && contains(password, firstName)) {
    errors.firstName = true;
  }

  if (!!lastName && !!password && contains(password, lastName)) {
    errors.lastName = true;
  }

  return Object.keys(errors).some(e => errors[e]) ? errors : null;
}
