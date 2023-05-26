import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {
  }

  goToIndex() {
    this.router.navigate(['/', 'index']);
  }
  goToAboutUs() {
    this.router.navigate(['/', 'aboutUs']);
  }
  goToProducts() {
    this.router.navigate(['/', 'products']);
  }
}
