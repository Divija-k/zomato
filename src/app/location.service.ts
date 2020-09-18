import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders} from '@angular/common/http';
import { map} from 'rxjs/operators';
import{locationdetails} from "./Interfaces";
import{geocode} from './Interfaces';
import{ Restaurantdetails} from './Interfaces';
  import{allreviews} from './Interfaces';
import{Observable} from 'rxjs'

const  headers = new  HttpHeaders().set("user-key", "7e7c9bbe8aa2401689d95728e24352b8");
 
@Injectable({
  providedIn: 'root'
})
export class LocationService {

public mainUrl = 'https://developers.zomato.com/api/v2.1/';
  constructor(private _http: HttpClient) { 
   
  }
   getGeoCode(pos): Observable<Restaurantdetails[]>{
    const geoCode= this._http.get<geocode>(`${this.mainUrl}geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`, {headers}).pipe(map(x=>{
      return x.nearby_restaurants}))
    geoCode.subscribe(
      (res)=> console.log(res), 
      (err)=> console.log("unable to fetch geocode")
    )



  }
}
