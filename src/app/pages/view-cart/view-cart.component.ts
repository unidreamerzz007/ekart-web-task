import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgIf, NgFor,RouterModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss'
})
export class ViewCartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }

    const newProduct = history.state.product;
    if (newProduct) {
      this.addToCart(newProduct);
    }
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity += 1;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.saveCart();
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}