import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  
  constructor(private http: HttpClient) {}

  getLocations(): Observable<any>{
    return this.http.get<any[]>('https://rickandmortyapi.com/api/location/');
  }

}   