import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [NavbarComponent, FooterComponent, NgFor, NgIf, RouterModule],
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  isLoading: boolean = true;

  constructor(private router: Router) {}

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  handleSearch(query: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  ngOnInit() {
    this.isLoading = true;

    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      });
  }
}
