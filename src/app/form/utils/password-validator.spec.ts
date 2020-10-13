import { FormGroup } from 'ngx-typesafe-forms';
import { contains, passwordValidator } from './password-validator';
import { Profile } from './profile.model';

describe('password-validator', () => {

  it('contains function', () => {
    const str = 'this is a unit test';

    for (const s of str.split(' ')) {
      expect(contains(str, s)).toBeTrue();
    }

    expect(contains(str, 'TEST')).toBeTrue();
    expect(contains(str, 'fedex')).toBeFalse();
  });

  for (const test of [
    { firstName: 'Stefano', lastName: 'Borzi', password: 'password123', name: 'no-errors', output: null },
    { firstName: 'pass', lastName: 'Borzi', password: 'password123', name: 'first-name', output: { firstName: true, lastName: false } },
    { firstName: 'Stefano', lastName: 'word', password: 'password123', name: 'last-name', output: { firstName: false, lastName: true } },
    { firstName: 'pass', lastName: 'word', password: 'password123', name: 'first-last-name', output: { firstName: true, lastName: true } },
  ]) {

    it(`passwordValidator ${test.name}`, () => {
      const mockControls = {
        firstName: { value: test.firstName },
        lastName: { value: test.lastName },
        password: { value: test.password },
      };
      const mockFormGroup = { get: (fi: string) => mockControls[fi] } as FormGroup<Profile>;

      expect(passwordValidator(mockFormGroup)).toEqual(test.output);
    });

  }

});
