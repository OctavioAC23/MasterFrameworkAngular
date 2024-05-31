import { Routes } from '@angular/router';
//Aqui ira todo las direcciones para enrutar
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
//No se agrega nada mas solo esto 
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/articulo/:id',component:ArticleComponent},
    { path: 'buscar/:search',component:SearchComponent},
    { path: 'formulario', component: FormularioComponent },
    { path: 'blog/crear',component: ArticleNewComponent},
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'pagina-de-prueba', component: PaginaComponent },
    { path: 'blog/editar/:id',component:ArticleEditComponent},
    { path: 'pagina-de-prueba/:nombre/:apellidos', component: PaginaComponent },
    { path: '**',component:ErrorComponent}

];
