import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; //Para enrutamiento se agrega este import
import { HttpClientModule } from '@angular/common/http';
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { SliderComponent } from './components/slider/slider.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MiComponente,
    SliderComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent, 
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AprendiendoAngular';
}
