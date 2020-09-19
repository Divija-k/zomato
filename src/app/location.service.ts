import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders} from '@angular/common/http';
import { map} from 'rxjs/operators';
import{LocalRes} from './Interfaces';
import{ RestaurantDetail} from './Interfaces';
import{Observable} from 'rxjs'
import { locationDetails} from './Interfaces';
import{nearby_restaurants} from './Interfaces'

const  headers = new  HttpHeaders().set("user-key", "7e7c9bbe8aa2401689d95728e24352b8");
 
@Injectable({
  providedIn: 'root'
})
export class LocationService {

public mainUrl = 'https://developers.zomato.com/api/v2.1/';
  
  constructor(private _http: HttpClient) { 
   
  }
   getGeoCode(pos){
    const geoCode= this._http.get<LocalRes>(`${this.mainUrl}geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`, {headers}).pipe(map(x=>{
      return x.nearby_restaurants}))
   return geoCode;
    }
    getLocalDetails(location){
    return this._http.get<locationDetails>(`${this.mainUrl}locations?query=${location}`,{headers}).pipe(map(x=>{return x }))
    }
    getLocationDetails(entity_id,entity_type){
     return this._http.get<nearby_restaurants>(`${this.mainUrl}location_details?entity_id=${entity_id}&entity_type=${entity_type}`,{headers}).pipe(map(x=>{return x}))
    }
    getCollectionDetails(cityId){
      return this._http.get(this.mainUrl+'collections?city_id='+cityId,{headers}).pipe(map(x=>{return x}));
    }
    
    getRestaurantsInTrend(cityId,collectionId){
   return this._http.get(this.mainUrl+'search?entity_id='+cityId+'&entity_type=zonecity&collection_id='+collectionId,{headers}).pipe(map(x=>{return x}))
    }
}
