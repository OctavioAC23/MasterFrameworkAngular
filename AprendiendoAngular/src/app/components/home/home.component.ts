import { Component,OnInit } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticleService } from '../../services/article.service';
import { catchError, of } from 'rxjs';
import { Article } from '../../models/article';
import { ArticlesComponent } from "../articles/articles.component";
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    providers: [ArticleService],
    imports: [SliderComponent, SidebarComponent, ArticlesComponent]
})
export class HomeComponent {
  public title: string;
  public articles: Article[] | undefined;
  HomeText = 'Bienvenidos al master en frameworks para Angular';
  constructor(private _articleService:ArticleService){ 
    this.title = "Últimos Articulos";
  }
  
  ngOnInit(){
    this._articleService.getArticles(true).pipe(
      catchError(error => {
        console.error(error);
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe(
      response => {
        if (response.articles) {
          this.articles = response.articles;
        } else {
          // Manejo adicional si es necesario
        }
      }
    );
  }
}
