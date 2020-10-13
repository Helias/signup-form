import { ComponentFixture } from '@angular/core/testing';
import { FormComponent } from '../form.component';
import { Profile } from '../utils/profile.model';

export class FormPageObject {
  constructor(
    protected fixture: ComponentFixture<FormComponent>,
  ) {}

  get form(): HTMLFormElement { return this.fixture.nativeElement.querySelector('form'); }
  get firstName(): HTMLInputElement { return this.fixture.nativeElement.querySelector('#firstName'); }
  get lastName(): HTMLInputElement { return this.fixture.nativeElement.querySelector('#lastName'); }
  get email(): HTMLInputElement { return this.fixture.nativeElement.querySelector('#email'); }
  get password(): HTMLInputElement { return this.fixture.nativeElement.querySelector('#password'); }
  get submit(): HTMLInputElement { return this.fixture.nativeElement.querySelector('button'); }

  setInputValue(element: HTMLInputElement, value: string): void {
    element.value = `${value}`;
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('change'));
    element.dispatchEvent(new Event('blur'));
    this.fixture.detectChanges();
  }
}

export function fillForm(page: FormPageObject, fixture: ComponentFixture<FormComponent>, fields: Profile): void {
  page.setInputValue(page.firstName, fields.firstName);
  page.setInputValue(page.lastName, fields.lastName);
  page.setInputValue(page.email, fields.email);
  page.setInputValue(page.password, fields.password);
  fixture.detectChanges();
}

export const mockInputsValues: Profile[] = [
  { firstName: '@first name', lastName: 'last name',  email: 'test@test.com', password: 'Password123' },
  { firstName: 'first name',  lastName: '@last name', email: 'test@test.com', password: 'Password123' },
  { firstName: 'word',        lastName: 'last name',  email: 'test@test.com', password: 'Password123' },
  { firstName: 'first name',  lastName: 'Pass',       email: 'test@test.com', password: 'Password123' },
  { firstName: 'pass',        lastName: 'word',       email: 'test@test.com', password: 'Password123' },
  { firstName: 'first name',  lastName: 'last name',  email: 'test@test',     password: 'Password123' },
  { firstName: 'first name',  lastName: 'last name',  email: 'test@test.c',   password: 'Password123' },
  { firstName: 'first name',  lastName: 'last name',  email: 'test@test.com', password: 'password123' },
  { firstName: 'first name',  lastName: 'last name',  email: 'test@test.com', password: 'PASSWORD123' },
  { firstName: 'first name',  lastName: 'last name',  email: 'test@test.com', password: 'pass'        },
  { firstName: '@pa',         lastName: '@pa',        email: 'email@email',   password: '@pass',      },
  { firstName: 'first name',  lastName: 'last name',  email: 'test@test.com', password: 'Password123' },
];
