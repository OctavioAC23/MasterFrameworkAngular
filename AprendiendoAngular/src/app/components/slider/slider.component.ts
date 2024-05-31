import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  activeLink: string = '';
  @Input() nombre!: string;
  @Input () size!: string;
  constructor(private router: Router) {}
  
  navigate(event: Event, link: string) {
    event.preventDefault();
    this.activeLink = link;
    this.router.navigate([`/${link}`]);
  }

  
}
