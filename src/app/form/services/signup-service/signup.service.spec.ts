import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
  });

  const setup = () => {
    const http = TestBed.inject(HttpTestingController);
    const service = TestBed.inject(SignupService);
    return { service, http };
  };

  it('signup', (done) => {
    const { service, http } = setup();

    const mockParams = {
      firstName: 'first name',
      lastName: 'last name',
      email: 'email@gmail.com',
    };

    service.signUp(mockParams).subscribe((response) => {
      expect(response).toEqual('response');
      done();
    });

    http.expectOne({
      url: 'https://demo-api.now.sh/users',
      method: 'POST'
    }).flush('response');
  });
});
