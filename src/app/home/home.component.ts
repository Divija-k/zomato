import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public lat: number;
 public lon: number;
 public user_location: string;
 public entityId: number;
 public entityType: string;
  bestRestaurants: any[];
  locationDetails: import("c:/PROJECT ZOMATO/zomato-frontend/src/app/Interfaces").nearby_restaurants;
  cityName: string;
  cityId: number;

  constructor(private _http: LocationService, private router: Router) { }
  ngOnInit(): void {
   
    //TO GET LATITUDE & LONGITUDE 
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
         this.getPosition(position);
         this._http.getGeoCode(position);
      })
    }
    else{
      console.log("unable to retrieve geolocation")
        } 
    }
    getPosition(position: Position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    console.log(`lon:${this.lon},lat:${this.lat}`)
    
  }


//TO GET ENTITY ID & ENTITY TYPE FROM LOCATION API.
  public getLocalDetails(location):any{
    this._http.getLocalDetails(location).subscribe(
      (res)=> {
        this.entityId=res.entity_id;
        this.entityType= res.entity_type;
        this.cityName = res.city_name;
        this.cityId = res.city_id;
        console.log(res)
            this.router.navigate(['/details', this.cityName, this.cityId]); //TO REDIRECT TO A PAGE WITH ALL TRENDINGS, CATEGORIES< ESTABLISHMENTS IN A CITY
      },
      (err)=> {
         return this.router.navigate(['**']);;
      },
      )

    }

  }