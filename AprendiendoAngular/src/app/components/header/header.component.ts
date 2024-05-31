import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeLink: string = '';
  constructor(private router: Router) {}

  navigate(event: Event, link: string) {
    event.preventDefault();
    this.activeLink = link;
    this.router.navigate([`/${link}`]);
  }
}
