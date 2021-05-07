import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  
  constructor() { }


  addToCart(theCartItem: CartItem){
    //check if the item is already present or not if present then update the quantity

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
      alreadyExistsInCart = (existingCartItem != undefined);
    }


    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      //just add the item to the aray
      this.cartItems.push(theCartItem);
    }

    //compute the cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue: number =0;
    let totalQuantityValue: number =0;

    for(let tempCartItem of this.cartItems){
      totalPriceValue+= tempCartItem.unitPrice * tempCartItem.quantity;
      totalQuantityValue+= tempCartItem.quantity;
    }

    //publish the new values.. all subcribers will receive the updated value  
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue); 

    //log cart data for debugging

    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {

    console.log(`content of the cart:::::`);
    for(let tempCartItem of this.cartItems){
      const subTotal = tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, qty: ${tempCartItem.quantity}, unit price: ${tempCartItem.unitPrice}::: total: ${subTotal}`);
    }

    console.log("price: " + totalPriceValue.toFixed(2) + " qty: " + totalQuantityValue);
    console.log("--------");
  }
}
