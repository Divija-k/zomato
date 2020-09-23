import { Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders} from '@angular/common/http';
import { map} from 'rxjs/operators';
import{Observable} from 'rxjs'
import{places} from './places';
const  headers = new  HttpHeaders().set("user-key", "7e7c9bbe8aa2401689d95728e24352b8");
 
@Injectable({
  providedIn: 'root'
})
export class LocationService {

public mainUrl = 'https://developers.zomato.com/api/v2.1/';
cities = places;
  constructor(private _http: HttpClient) { 
   
  }
   getGeoCode(pos){
   let geoCode= this._http.get(`${this.mainUrl}geocode?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`, {headers});
   return geoCode;
    }
    
  getCityId(id) {
    let responseCityID = this._http.get(this.mainUrl + "cities?q=" + id, {headers});
    return responseCityID;
  }
  getCollectionDetails(cityId){
    let CollectionDetails = this._http.get(this.mainUrl+'collections?city_id='+cityId,{headers});
    return CollectionDetails;
  }
  
  getCategoriesDetails() {
    let categoryDetails = this._http.get(this.mainUrl + "categories", {headers});
    return categoryDetails;
  }
  getEstablishmentsDetails(cityId) {
    let establishmentDetails = this._http.get(this.mainUrl + "establishments?city_id=" + cityId, {headers});
    return establishmentDetails;
  }

  getListofRestaurants(cityId) {
    let restaurants = this._http.get(this.mainUrl + "search?entity_id=" + cityId + "&count=1000", {headers});
    return restaurants;
  }

  getTrendingRestaurants(cityId, collectionId) {
    let response = this._http.get(this.mainUrl + "search?entity_id=" + cityId + "&entity_type=city&collection_id=" + collectionId, {headers});
    return response;
  }

  getRestaurantDetails(restoId) {
    let RestaurantDetails = this._http.get(this.mainUrl + "restaurant?res_id=" + restoId, {headers});
    console.log(RestaurantDetails);
    return RestaurantDetails;
  }

  getReviews(restoId) {
    let reviews = this._http.get(this.mainUrl + "reviews?res_id=" + restoId, {headers});
    return reviews;
  }
}
