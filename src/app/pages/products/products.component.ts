import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  imports: [NavbarComponent, FooterComponent, NgFor, NgIf, RouterModule,FormsModule,CommonModule],
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  isLoading: boolean = true;
  showModal: boolean = false;
  selectedCategory: string = '';
  maxPrice: number | null = null;

  constructor(private router: Router) {}

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  handleSearch(query: string) {
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;


      return matchesCategory;
    });
  }

  ngOnInit() {
    this.isLoading = true;

    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;

        // Extract categories
        this.categories = [...new Set(data.map((product: any) => product.category))] as string[];
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      });
  }
}