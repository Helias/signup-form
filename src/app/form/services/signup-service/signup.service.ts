import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../../utils/profile.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
  ) { }

  public signUp(params: Profile): Observable<any> {
    return this.http.post(`${environment.API}/users`, params);
  }
}
