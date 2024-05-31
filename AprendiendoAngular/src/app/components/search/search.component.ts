import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from "../articles/articles.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SliderComponent } from "../slider/slider.component";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [ArticlesComponent, SidebarComponent, SliderComponent,CommonModule],
    providers: [ArticleService]
})
export class SearchComponent implements OnInit {
    public articles: Article[] | undefined;
    public search:string | undefined;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _articleService: ArticleService
    ) { }

    ngOnInit() {
        
        this._route.params.pipe(
            switchMap((params: Params) => {
                const search = params['search'];
                this.search = search;
                return this._articleService.search(search).pipe(
                    catchError(error => {
                      return of({ articles: [] }); // Devuelve un objeto vacío para manejar el error
                    })
                );
            })
        ).subscribe(response => {
            if (response.articles) {
                this.articles = response.articles;
            }
        });
    }
}
