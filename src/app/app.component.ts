import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // 🛠 Fix typo
})
export class AppComponent {
  title = 'Ekart-WebApp';
  name: string = '';
}