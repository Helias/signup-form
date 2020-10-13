import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FormComponent } from './form.component';
import { FormModule } from './form.module';
import { SignupService } from './services/signup-service/signup.service';
import { fillForm, FormPageObject, mockInputsValues } from './test/form-page-object';
import { Profile } from './utils/profile.model';

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

    return { service, fixture, component, page };
  };

  it('submitForm should be disabled', () => {
    const { component, page, fixture } = setup();
    fixture.detectChanges();

    // empty inputs, submit disabled and loading gif invisible
    expect(component.loading).toBeFalse();
    expect(component.finishLoading).toBeFalse();
    expect(component.signupForm.valid).toBeFalse();
    expect(page.submit.disabled).toBeTrue();
  });

  it('submitForm should be enabled', () => {
    const { component, page, fixture } = setup();
    fixture.detectChanges();

    fillForm(page, fixture, mockInputsValues[11]);

    expect(component.loading).toBeFalse();
    expect(component.finishLoading).toBeFalse();
    expect(page.submit.disabled).toBeFalse();
  });


  it('click on submitForm succesfully', () => {
    const { service, component, page, fixture } = setup();
    const signup = new Subject();
    spyOn(service, 'signUp').and.returnValue(signup);
    fixture.detectChanges();

    const mockInputValues: Profile = { firstName: 'first name', lastName: 'last name', email: 'test@test.com', password: 'Password123' };
    fillForm(page, fixture, mockInputValues);

    expect(component.signupForm.valid).toBeTrue();
    expect(page.submit.disabled).toBeFalse();

    page.submit.click();
    fixture.detectChanges();

    // submitted loading gif visible
    expect(component.loading).toBeTrue();
    expect(component.finishLoading).toBeFalse();

    signup.next('response');
    signup.complete();

    fixture.detectChanges();

    // emitted value by the observable -> finished loading icon visible and loading invisible
    expect(component.loading).toBeFalse();
    expect(component.finishLoading).toBeTrue();
  });

});
