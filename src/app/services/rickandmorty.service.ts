import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataLocation } from './rickandmorty.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api';
  
  constructor(private http: HttpClient) {}

  getLocations(page?: number): Observable<IDataLocation>{
    let url = `${this.apiUrl}/location`;
    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get<IDataLocation>(url);
  }

  getEndpoint(url: string): Observable<any> {
    return this.http.get(url);
  }

}   