import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllListingComponent } from './all-listing/all-listing.component';


const routes: Routes = [
  {
    path:'',
    component:AllListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule { }
