 
import Chart from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'business.component.html'
})

export class BusinessComponent{
  loginForm = new FormGroup({
    type : new FormControl('',Validators.required),
});
 
username : string;
password : string;
phone:string;
address : string;
restaurantName:string;
region :string;
submitted = false;
returnUrl: string;

ngOnInit() {
    
}
get f(){
    return this.loginForm.controls;
  }
onSubmit() {
   alert(this.username+"\n"+this.password+"\n"+this.phone+"\n"+this.address+"\n"+this.region+"\n"+this.restaurantName);
}
getTitle(){
    return "Add Business Account";
}
getPassword(e){
    this.password = e.target.value;
}
getUsername(e){
    this.username = e.target.value;
}
getPhone(e){
    this.phone = e.target.value;
}
getAddress(e){
    this.address = e.target.value;
}
getRegion(e){
    this.region = e.target.value;
}
getRestaurantName(e){
  this.restaurantName = e.target.value;
}
}


