import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataLocation } from './rickandmorty.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  
  constructor(private http: HttpClient) {}

  getLocations(page?: number): Observable<IDataLocation>{
    let url = 'https://rickandmortyapi.com/api/location';
    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get<IDataLocation>(url);
  }

}   