import { Component, OnInit } from '@angular/core';
import{ActivatedRoute, Router} from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _http: LocationService) { }

  ngOnInit(): void {
  }

}
