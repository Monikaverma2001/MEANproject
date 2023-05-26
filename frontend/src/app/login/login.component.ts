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
  data: {} | undefined;
 ngOnInit() {
  this.getDataFromApi();
 }
 constructor(private service:ServiceService){}
 getDataFromApi(){
  this.service.getData().subscribe((response)=>{
    this.data=response;
    console.log("responsing",response);
  },(error)=>{
    console.log(error);
  })
 }

}
