import { Component } from "@angular/core";
import { PeliculasComponent } from "../peliculas/peliculas.component";
import { PruebasComponent } from "../pruebas/pruebas.component";
import { NgIf } from "@angular/common";
@Component({
    selector:'mi-componente',
    imports: [PeliculasComponent,PruebasComponent,NgIf],
    standalone: true,
    templateUrl: './mi-componente.component.html'
})

export class MiComponente{
    public titulo: string;
    public comentario: string;
    public year: number;
    public mostraPeliculas: boolean;
    constructor(){
        this.titulo = "Hola mundo desde Funcion";
        this.comentario = "Este usa funcion tambien";
        this.year = 2024;
        this.mostraPeliculas = true;
        console.log("Mi componente cargado");
        console.log(this.titulo,this.comentario,this.year);
    }
    ocultarPeliculas(){
        this.mostraPeliculas=false;
    }
}