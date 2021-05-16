import { User } from './../../_models/user';
import { UserOrderComponent } from './../user-order/user-order.component';
import { Component, OnInit } from '@angular/core';
 
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userOrder } from 'app/_models/userOrder';
import { PersonalInfo } from 'app/_models/Personalnfo';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
 
@Component({
    selector: 'user-order-history-cmp',
    moduleId: module.id,
    templateUrl: 'user-order-history.component.html'
})

export class UserOrderHistoryComponent implements OnInit{
    public orders: userOrder [] = [{customerName: "İnsan Çocuğu", idNo: 5, items: ["abc","cde"], date: new Date(), price: 120.45, 
                                    restaurantName: "Burger King", restaurantReview: "Nice!", restaurantRating: 3.5, delGuyReview:"Cool!",delGuyRating: 3.9,
                                    restaurantResponse:"Thanks!",orderState: "Delivered"},
                                    {customerName: "İnsan Çocuğu 2", idNo: 3, items: ["adf","dsg"], date: new Date(), price: 30.15, 
                                    restaurantName: "ASPAVA", restaurantReview: "Nice!", restaurantRating:4.5, delGuyReview:"Cool!",delGuyRating: 3.9,
                                    restaurantResponse:"No Thanks!",orderState: "Delivered"},
                                    {customerName: "İnsan Çocuğu 3", idNo: 4, items: ["çükbaş","amcıkağaz"], date: new Date(), price: 21.15, 
                                    restaurantName: "PİZZA", restaurantReview: "Dick!", restaurantRating:0.5, delGuyReview:"BRUH!",delGuyRating: 3.9,
                                    restaurantResponse:"No Thanks!",orderState: "En Route"}];
    public counter : number;
    public user: PersonalInfo = {fullName: "Kemal Kılıçdaroğlu", credits: 120.43, address:"Somewhere in bilkent" };
    public closeResult = '';
    public responseDeliveryGuyStatus: string;
    public responseRestaurantStatus: string;
    public responseStatus: string;
    public flag = false;
    public currentOrder: userOrder;

    loginForm = new FormGroup({
        type : new FormControl('',Validators.required),
    });
    constructor(private modalService: NgbModal,private formBuilder: FormBuilder,)
    {}

    ngOnInit(){                  //Database'den çekilecek kısım bu
        this.counter = 0;
        this.responseStatus='';
        this.currentOrder = {customerName: "", idNo: 5, items: ["",""], date: new Date(), price: 0, 
        restaurantName: "", restaurantReview: "", restaurantRating: 0, delGuyReview:"!",delGuyRating: 0,
        restaurantResponse:"",orderState: ""};
      }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = ``;
        }, (reason) => {
          this.closeResult = ``;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return '';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return '';
        } else {
          return ``;
        }
      }
  
   
    setRestaurantReview(review, rating){
      this.currentOrder.restaurantReview =review;
      this.currentOrder.restaurantRating =rating;
    }
    setDelGuyReview(review, rating){
      this.currentOrder.delGuyReview =review;
      this.currentOrder.delGuyRating =rating;
    }

    setOrderDetails(items, price){
      this.currentOrder.items = items;
      this.currentOrder.price = price;
    }
    setResponse(response){
      this.currentOrder.restaurantResponse =response;
    }
   
    saveRestaurantReview(e){
        this.responseRestaurantStatus= e.target.value;
        this.flag = true;
    }
    saveDelGuyReview(e){

    }

    updatePage(){}
  
    refreshFilter(){
      //this.updatePage();
    }

    submitRestaurantFilter(){
      //this.counter = 0;
      //this.resultAssignment=this.assignments.filter(item=> item.RESTAURANT_NAME ===this.filteredRestaurantName);
        
    }
    changeRestaurantSelection(e){
      //this.filteredRestaurantName = e.target.value;
    }
  
}
