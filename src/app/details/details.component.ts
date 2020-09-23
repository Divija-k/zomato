import { Component, OnInit } from '@angular/core';
import{LocationService} from '../location.service'
import{ Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  
  title = 'Food-e-Delicious';
  cityName: string = "";
  cityIdDetail: any;
  collection: any;
  categoriesDetail:any;
  establishment: any;
  restaurantList: any;
  selectedCityName: string = "";
  cities: any;
  collectionId: number;
  loading: boolean = false;
  searchRestoList: any = [];
  selectedRestoName: string = "";

  constructor(private _http: LocationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.cities = this._http.cities;
    this.getAllDetails();
  }

  async goToDetails(e, cityName) {
    await this.router.navigate(['/details', cityName]);
    this.getAllDetails();
  }

  goToRestaurant(e, restoName) {
    if(restoName === "" || restoName === undefined) {
      this.router.navigate(['**']);
    } else {
    this.router.navigate(['/restaurant', restoName]);
    }
  }

  async getAllDetails() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id').toString();
    this.cityName = id;
    this.selectedCityName = this.cityName;
    await this._http.getCityId(id).subscribe(
      async data => {
        for(let key in data) {
          if (key == "location_suggestions") {
            this.cityIdDetail = await data[key][0].id;
            this.getcollectionDetails(this.cityIdDetail);
          }
        }
      }
    )
    await this.getCategoriesDetails();
  }
  
  getcollectionDetails(cityId) {
    this._http.getCollectionDetails(cityId).subscribe(
      data => {
        this.collection = data;
        this.collection = this.collection.collections;
        for(let i of this.collection) {
          if(i.collection.title == "Trending This Week") {
            this.collection = i.collection;
            this.collectionId = i.collection.collection_id;
          }
        }
        this.getTrendingRestaurant(this.cityIdDetail, this.collectionId);
      }
    )
  }

  getCategoriesDetails() {
    this._http.getCategoriesDetails().subscribe(
      data => {
        this.categoriesDetail = data;
        this.categoriesDetail = this.categoriesDetail.categories;
      }
    )
  }

  getTrendingRestaurant(cityId, collectionId) {
    this._http.getTrendingRestaurants(cityId, collectionId).subscribe(
      data => {
        this.restaurantList = data;
        this.restaurantList = Array.from(this.restaurantList.restaurants);
        this.searchRestoList = this.restaurantList;
        
      }
    )
  }
}
