import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterModule,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {

  products: any[] = [];

  constructor(private router:Router) {}

  navigateToProducts(searchQuery: string) {
    if (searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: searchQuery } });
    }
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
   

    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
        
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      
      });
  }
  goToCart(product: any) {
    this.router.navigate(['/cart'], { state: { product } });
  }


}
