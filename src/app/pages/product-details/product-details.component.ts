import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, NgIf, NgFor],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: any; // Store a single product
  similarProducts: any[] = []; // Store similar products

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the product ID from the URL
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.fetchProduct(productId);
      }
    });
  }

  goBackToProducts() {
    this.router.navigate(['/products']);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  // Fetch product details
  fetchProduct(id: string) {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.product = data;

        // Fetch similar products based on category
        this.fetchSimilarProducts(data.category, id);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }

  goToCart(product: any) {
    this.router.navigate(['/cart'], { state: { product } });
  }

  // Fetch 3 similar products by category
  fetchSimilarProducts(category: string, currentProductId: string) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter out the current product and limit to 3
        this.similarProducts = data
          .filter((item: any) => item.id !== currentProductId) // Exclude current product
          .slice(0, 3); // Show only 3 products
      })
      .catch((error) => {
        console.error('Error fetching similar products:', error);
      });
  }
}
