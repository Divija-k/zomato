import { getParseErrors } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import{Routes,ActivatedRoute} from '@angular/router';
import { LocationService } from '../location.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lat: number;
  lon: number;
  user_defined_location: string;

  constructor(private _http: LocationService) { }
public location(){
  location: this.user_defined_location;
}
  ngOnInit(): void {
     
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
   
  }
