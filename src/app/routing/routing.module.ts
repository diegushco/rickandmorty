import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { DimensionsComponent } from '../components/dimensions/dimensions.component';
import { LocationsComponent } from '../components/locations/locations.component';
 
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'dimensions', component: DimensionsComponent},
  { path: 'locations', component: LocationsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
 
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
