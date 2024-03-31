import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  private POSTURL = environment.apiURL+"get-all-posts";

  constructor(private http: HttpClient) {

   }

   getPosts(): Observable<any>
   {
     return this.http.get(this.POSTURL);
   }
}
