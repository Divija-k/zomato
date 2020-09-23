import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ Routes, RouterModule} from '@angular/router';
import{LocationService} from './location.service';
import { NgSelectModule } from '@ng-select/ng-select'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ErrorComponent } from './error/error.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { componentFactoryName } from '@angular/compiler';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    ErrorComponent,
    RestaurantComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home', component:HomeComponent},
      {path:'details/:id',component:DetailsComponent},
      {path:'restaurant/:id', component:RestaurantComponent},
      {path:'**', component:ErrorComponent}
    ]),
    HttpClientModule,
    NgSelectModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
