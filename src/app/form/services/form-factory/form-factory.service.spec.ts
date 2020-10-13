import { TestBed } from '@angular/core/testing';
import { FormFactoryService } from './form-factory.service';

describe('FormFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const service = TestBed.inject(FormFactoryService);
    const formGroup = service.createSignupForm();

    // TODO: we could add more checks here
    expect(formGroup).toBeDefined();
    expect(typeof(formGroup)).toBe('object');
    expect(formGroup.controls.firstName).toBeDefined();
    expect(formGroup.controls.lastName).toBeDefined();
    expect(formGroup.controls.email).toBeDefined();
    expect(formGroup.controls.password).toBeDefined();
  });
});
