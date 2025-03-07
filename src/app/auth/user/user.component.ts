import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('loggedInUser');
    console.log('Stored user data:', storedUser);
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      console.log('Parsed user data:', userData);
      
      if (userData.email) {
        this.username = userData.email.split('@')[0];
        console.log('Extracted username:', this.username);
      } else {
        console.log('No email found in user data');
      }
    } else {
      console.log('No user data found in localStorage');
    }
  }

  signOut() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
