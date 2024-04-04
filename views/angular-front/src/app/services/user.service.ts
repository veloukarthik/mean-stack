import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


let token = localStorage.getItem('token');

let headers: any = {
  'headers': {
    'authorization': 'Bearer ' + token
  }
}
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private loginURL = environment.apiURL + "login";
  private registerURL = environment.apiURL + "register";
  private myaccountURL = environment.apiURL + 'my-account';
  private listURL = environment.apiURL + ''

  public getUser = localStorage.getItem('user');
  private user = this.getUser ? JSON.parse(this.getUser) : '';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {

  }

  login(data: any) {
    return this.http.post(this.loginURL, data);
  }

  register(data: any) {
    return this.http.post(this.registerURL, data);
  }

  myaccount(data: any) {
    return this.http.post(this.myaccountURL, data, headers);
  }

  listUser(data: any) {
    return this.http.post(this.listURL, data,);
  }

}
