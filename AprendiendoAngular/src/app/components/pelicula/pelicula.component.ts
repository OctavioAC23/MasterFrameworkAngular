import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {
  @Input()
  pelicula!: Pelicula;
  @Output()
  MarcarFavorita = new EventEmitter();
  seleccionar(event: any,pelicula: any){
    this.MarcarFavorita.emit({
      pelicula:pelicula
    });    
  }
}
