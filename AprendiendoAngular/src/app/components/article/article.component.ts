import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { SliderComponent } from "../slider/slider.component";
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { Global } from '../../services/global';

import 'moment/locale/es';
@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  imports: [SidebarComponent,CommonModule, SliderComponent,MomentModule,RouterModule],
  providers: [ArticleService]
})
export class ArticleComponent {
  public article: Article | undefined;
  public url: string;
  constructor(
    public _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        Response =>{
          if(Response.article){
            this.article = Response.article;
          }else{
            this._router.navigate(['/home']);
          }
        },
        error =>{
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    })
  }

  delete(id: any){
    this._articleService.delete(id).subscribe(
      response=>{
        this._router.navigate(['/blog']);
      },
      error=>{
        console.log(error);
      }
    );
  }
}
