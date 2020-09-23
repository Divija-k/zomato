import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import{ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 public lat: number;
 public lon: number;
 public places: any;
 public chosenCityName: string = "";
 public cityName: string = "";
  cities: any;

  constructor(private _http: LocationService, private router: Router) { }
  ngOnInit(): void {
    this.cities = this._http.cities;
  
    //TO GET LATITUDE & LONGITUDE 
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
         this.getPosition(position);
         this._http.getGeoCode(position);
      })
    }
    else{
      console.log("unable to retrieve geolocation");
        } 
    }
    getPosition(position: Position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    console.log(`lon:${this.lon},lat:${this.lat}`)
    
  }

  goToDetails(e, cityName) {
    this.router.navigate(['/details', cityName]);
  }
  
  
}
