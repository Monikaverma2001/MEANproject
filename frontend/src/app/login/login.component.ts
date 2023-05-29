import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";  
import { ServiceService } from './service.service';
import { Model } from './model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  data=''
  name=[]
  urn=[]

 ngOnInit():void {
  
 }
 constructor(private service:ServiceService){
  this.name=[]
  this.urn=[]
 }
 getDataFromApi() {
  this.service.getData().subscribe(response=>{
    this.name=response['0']['name'];
    this.data=JSON.stringify(response);
   // this.data=response.toArray();
    console.log("responsing",this.data);
  },(error)=>{
    console.log(error);
  })
 }
 
}
