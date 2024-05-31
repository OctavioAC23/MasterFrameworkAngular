import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pelicula } from '../../models/pelicula';
import { SliderComponent } from "../slider/slider.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PeliculaComponent } from "../pelicula/pelicula.component";
import { EsparPipe } from '../../pipes/espar.pipe';
import { PeliculaService } from '../../services/pelicula.service';
@Component({
  selector: 'app-peliculas',
  standalone: true,
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService],
  imports: [CommonModule, SliderComponent, SidebarComponent, PeliculaComponent, EsparPipe]
})
export class PeliculasComponent {
  public titulo: string;
  public peliculas: Pelicula[];
  public favorita: Pelicula|undefined;
  public fecha:any;

  constructor(
    private _peliculaService: PeliculaService
  ) {
    // Asignar un valor a diferentes propiedades (No se le hace nada lógico)
    this.titulo = "Componente Peliculas";
    this.favorita = undefined;
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha = new Date(2024,4,27);
  }

  ngOnInit() {
    // Aquí se hace toda la parte lógica
    console.log("Componente Iniciado");
    console.log(this._peliculaService.holaMundo());
  }

  ngDoCheck() {
    // Aquí se actualiza o se ejecuta cuando se realiza un cambio durante la página, ejemplo un botón
    console.log("DoCheck Lanzado");
  }

  cambiar_titulo() {
    this.titulo = "El título ha sido cambiado";
  }

  ngOnDestroy() {
    console.log("El componente se va a eliminar");
  }

  mostrarFavorita(event: any) {
    this.favorita = event.pelicula;
  }
}
