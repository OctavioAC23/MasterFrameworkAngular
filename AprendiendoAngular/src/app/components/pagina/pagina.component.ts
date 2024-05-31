import { Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SliderComponent } from "../slider/slider.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    standalone: true,
    selector: 'app-pagina',
    templateUrl: './pagina.component.html',
    styleUrls: ['./pagina.component.css'],
    imports: [CommonModule, SliderComponent, SidebarComponent]
})
export class PaginaComponent{
  public nombre: string = '';
  public apellidos: string = '';
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.params.subscribe((params: Params) => {
      this.nombre = params['nombre'];
      this.apellidos = params['apellidos'];
    });
  }

  redireccion(){
    this._router.navigate(['/pagina-de-prueba','Octavio','Alvarez']);
  }
}
