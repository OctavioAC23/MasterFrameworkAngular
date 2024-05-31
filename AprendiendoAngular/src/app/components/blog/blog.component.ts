import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from "../slider/slider.component";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Global } from '../../services/global';
import { ArticlesComponent } from "../articles/articles.component";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-blog',
    standalone: true,
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    providers: [ArticleService],
    imports: [SliderComponent, SidebarComponent, CommonModule, ArticlesComponent]
})
export class BlogComponent {
  nombre = "BLOG";
  public articles: Article[] | undefined;
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this._articleService.getArticles().pipe(
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
