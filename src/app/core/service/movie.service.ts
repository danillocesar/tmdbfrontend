import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toHttpParams } from '../helper/http.helper';
import { Observable } from 'rxjs';

@Injectable()
export class MovieService {

  constructor(private http:HttpClient) { }

  public getUpcoming(page:number):Observable<ApiResponse>{
    return this.http.get<any>(`http://localhost/movies/upcoming?page=${page}`);
  }
  public queryMovie(query:string, page:number):Observable<ApiResponse>{
    return this.http.get<any>(`http://localhost/movies/query?query=${query}&page=${page}`);
  }
}