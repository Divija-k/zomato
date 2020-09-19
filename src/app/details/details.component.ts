import { Component, OnInit } from '@angular/core';
import{LocationService} from '../location.service'
import{ Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  cityName: string;
  cityId: string;
  collection: any;
  collectionId: any;
  restaurantList: any;
  searchRestaurantList: any;

  constructor(private route: ActivatedRoute,private _http: LocationService,private router:Router) { }

  ngOnInit(): void {
    this.getAllDetails();
  }
  //Guided from search page to in detail page
  async goToDetails(e, cityName, cityid) {
    await this.router.navigate(['/details', cityName, cityid]);
    this.getAllDetails();
  }
  //takes values from route parameters
  public getAllDetails(){
    this.cityName = this.route.snapshot.paramMap.get('cityname').toString();
    this.cityId = this.route.snapshot.paramMap.get('cityid');
    this.getcollectionDetails(this.cityId)
  }
//gets all detailed collections in a city
  public getcollectionDetails(cityId) {
    this._http.getCollectionDetails(cityId).subscribe(
      res => {
        this.collection = res;
        for(let i of this.collection) {
          if(i.collection.title == "Trending This Week") {
            this.collection = i.collection;
            this.collectionId = i.collection.collection_id;
          }
        }
        this.getRestaurantsInTrend(this.cityId, this.collectionId);
      }
    )
  }
  //Dislaying the restaurants in trend
  public getRestaurantsInTrend(cityId,collectionId) {
    this._http.getRestaurantsInTrend(cityId,collectionId).subscribe(
      (res)=>{
        this.restaurantList = res;
        this.restaurantList = Array.from(this.restaurantList.restaurants);
        console.log(this.restaurantList);
        this.searchRestaurantList = this.restaurantList;
      }
    )
       
  }
//Takes to one single restaurant page
  goToRestaurant(e, restaurantName) {
    if(restaurantName === "" || restaurantName === undefined) {
      this.router.navigate(['**']);
    } else {
    this.router.navigate(['/restaurant', restaurantName]);
    }
  }

}
