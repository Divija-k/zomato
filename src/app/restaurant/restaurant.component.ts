import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {


reviewList: any;
list: any = [];
cities: any;
loading: boolean;
selectedCityName: string ="";
cityName: string ="";
restoName: string = "";
selectedRestoName;
searchRestoList;

constructor(private _http: LocationService,
  private route: ActivatedRoute,
  private router: Router) { }

ngOnInit() {
  this.cities = this._http.cities;
  this.getRestoDetail();
}
goToDetails(e, cityName) {
  this.router.navigate(['/details', cityName]);
}

async getRestoDetail() {
  const id = +this.route.snapshot.paramMap.get('id');
  console.log(id);
  await this._http.getRestaurantDetails(id).subscribe(
    data => {
      this.reviewList = data;
    },
    error => {
      this.router.navigate(['**']);
    }
  );
  this._http.getReviews(id).subscribe(
      data => {
        this.reviewList = Object.assign(data, this.reviewList);
        this.list.push(this.reviewList);
        
      },
      error => {
        this.router.navigate(['**']);
      }
    );
}


}
