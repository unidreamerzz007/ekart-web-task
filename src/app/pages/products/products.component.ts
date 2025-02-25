import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [NavbarComponent, FooterComponent, NgFor,NgIf], 
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  isLoading: boolean = true;

  viewProduct(productId: number) {
    window.location.href = `/products/${productId}`;
  }

  ngOnInit() {
    this.isLoading = true;

    fetch('https://dummyjson.com/products?500')
      .then((res) => res.json())
      .then((data) => {
        this.products = data.products;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      });
  }
}