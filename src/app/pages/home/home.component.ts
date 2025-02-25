import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router:Router) {}

  navigateToProducts(searchQuery: string) {
    if (searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: searchQuery } });
    }
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
