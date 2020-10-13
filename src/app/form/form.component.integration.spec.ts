import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormModule } from './form.module';
import { SignupService } from './services/signup-service/signup.service';
import { fillForm, FormPageObject, mockInputsValues } from './test/form-page-object';

describe('FormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormModule,
      ],
    })
    .compileComponents();
  }));

  const setup = () => {
    const service = TestBed.inject(SignupService);
    const fixture = TestBed.createComponent(FormComponent);
    const component = fixture.componentInstance;
    const page = new FormPageObject(fixture);
    fixture.detectChanges();
    fixture.autoDetectChanges(true);

    return { component, service, fixture, page };
  };

  const trackErrors = {
    fname: 'Invalid First Name!',
    lname: 'Invalid Last Name!',
    email: 'Invalid email!',
    pwd_firstname: 'The password contains words of First Name!',
    pwd_lastname: 'The password contains words of Last Name!',
    pwd_minlength: 'The password must have at least 8 characters!',
    pwd_cases: 'The password must have at least an uppercase and lowercase letter!',
  };
  const errors = [
    { fname: true },
    { lname: true },
    { pwd_firstname: true },
    { pwd_lastname: true },
    { pwd_firstname: true, pwd_lastname: true },
    { email: true },
    { pwd_cases: true  },
    { pwd_minlength: true },
    { fname: true,  lname: true, email: true, pwd_firstname: true, pwd_lastname: true, pwd_minlength: true, pwd_cases: true },
  ];

  // cover all cases about validators
  for (const test of [
    { name: 'first name invalid',                        fields: mockInputsValues[0],  errors: errors[0]  },
    { name: 'last name invalid',                         fields: mockInputsValues[1],  errors: errors[1]  },
    { name: 'first name contained in password',          fields: mockInputsValues[2],  errors: errors[2]  },
    { name: 'last name contained in password',           fields: mockInputsValues[3],  errors: errors[3]  },
    { name: 'first and last name contained in password', fields: mockInputsValues[4],  errors: errors[4]  },
    { name: 'email invalid #1',                          fields: mockInputsValues[5],  errors: errors[5]  },
    { name: 'email invalid #2',                          fields: mockInputsValues[6],  errors: errors[5]  },
    { name: 'password with no uppercase character',      fields: mockInputsValues[7],  errors: errors[6]  },
    { name: 'password with no lowercase character',      fields: mockInputsValues[8],  errors: errors[6]  },
    { name: 'password with less than 8 characters',      fields: mockInputsValues[9],  errors: errors[7]  },
    { name: 'all input errors',                          fields: mockInputsValues[10], errors: errors[8]  },
  ]) {

    it(`validators ${test.name}`, () => {
      const { fixture, page } = setup();

      fillForm(page, fixture, test.fields);

      for (const error of Object.keys(test.errors)) {
        expect(page.form.innerText).toContain(trackErrors[error]);
      }
    });

  }

  for (const test of [
    { name: 'first name invalid',                        fields: mockInputsValues[0] },
    { name: 'last name invalid',                         fields: mockInputsValues[1] },
    { name: 'first name contained in password',          fields: mockInputsValues[2] },
    { name: 'last name contained in password',           fields: mockInputsValues[3] },
    { name: 'first and last name contained in password', fields: mockInputsValues[4] },
    { name: 'email invalid #1',                          fields: mockInputsValues[5] },
    { name: 'email invalid #2',                          fields: mockInputsValues[6] },
    { name: 'password with no uppercase character',      fields: mockInputsValues[7] },
    { name: 'password with no lowercase character',      fields: mockInputsValues[8] },
    { name: 'password with less than 8 characters',      fields: mockInputsValues[9] },
  ]) {

    it(`validators cases, ${test.name}`, () => {
      const { component, page, fixture } = setup();
      fixture.detectChanges();

      fillForm(page, fixture, test.fields);

      expect(component.signupForm.valid).toBeFalse();
      expect(page.submit.disabled).toBeTrue();
    });

  }

});
