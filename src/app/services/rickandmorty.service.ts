import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { IDataEpisodes, IDataLocation } from './rickandmorty.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {

  private apiUrl = 'https://rickandmortyapi.com/api';
  private dimensions = [];
  private episodes: IDataEpisodes[] = [];
  private locations: IDataLocation[] = [];
  
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

  getAllEpisodesByName(episodeName:string, urlNext?:string): Observable<any[]>{
    this.episodes = [];
    const url = (urlNext)? urlNext : `${this.apiUrl}/episode?name=${episodeName}`;
    
    return this.http.get<any>(url).pipe(
      switchMap((episodes)=>{
        this.episodes = this.episodes.concat(
          episodes.results ?? []
        );
        return episodes.info.next ? this.getAllEpisodesByName('', episodes.info.next) : of(this.episodes)
      }),
      catchError((err)=>{
        return of(err.error)
      })
    );
  }

  getAllLocationsByName(locationName:string, urlNext?:string): Observable<any[]>{
    this.locations = [];
    const url = (urlNext)? urlNext : `${this.apiUrl}/location?name=${locationName}`;
    
    return this.http.get<any>(url).pipe(
      switchMap((locations)=>{
        this.locations = this.locations.concat(
          locations.results ?? []
        );
        return locations.info.next ? this.getAllLocationsByName('', locations.info.next) : of(this.locations)
      }),
      catchError((err)=>{
        return of(err.error)
      })
    );
  }

}   