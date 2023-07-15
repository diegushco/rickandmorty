import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataEpisodes, IDataLocation } from './rickandmorty.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api';
  private dimensions = [];
  
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

  getEpisodes(page?: number): Observable<IDataEpisodes>{
    let url = `${this.apiUrl}/episode`;
    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get<IDataEpisodes>(url);
  }

  getDimensions(url: string) {
    this.getEndpoint(url).subscribe(response => {
      this.dimensions = this.dimensions.concat(response.results);
      if (response.info.next) {
        this.getDimensions(response.info.next);
      }else{
        console.log("TODO:", this.dimensions)
      }
    });
  }

}   