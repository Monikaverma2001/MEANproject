import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    redirectTo:'listings',
    pathMatch:"full"
  },
  {
    path:"listings",
    //lazzy loading,differential loading
    loadChildren:()=>import('./listing/listing.module').then(m=>m.ListingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
