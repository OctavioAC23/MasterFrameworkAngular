import { Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()
export class PeliculaService{

    public peliculas: Pelicula[];
    
    constructor(){
        this.peliculas =[
            new Pelicula("Superman", 2019, "https://img.ecartelera.com/noticias/76300/76336-h4.jpg"),
            new Pelicula("The Batman", 2018, "https://variety.com/wp-content/uploads/2023/01/MCDBATM_WB060.jpg?w=1024"),
            new Pelicula("Star Wars", 2017, "https://sm.ign.com/t/ign_latam/cover/s/star-wars-/star-wars-the-mandalorian_cu94.1200.jpg"),
            new Pelicula("Flash", 2016, "https://ds-images.bolavip.com/news/image?src=https%3A%2F%2Fimages.bolavip.com%2Fjpg%2Fcl%2Ffull%2FBCL_20230612_BCL_8377_de-que-se-trata-the-flash-conoce-la-historia-de-la-pelicula-dc-ok-scaled.jpg&width=1200&height=740")
          ];
    }
    
    holaMundo(){
        return "Hola Mundo desde un servicio de Angular";
    }

    getPeliculas(){
        return this.peliculas;
    }
}