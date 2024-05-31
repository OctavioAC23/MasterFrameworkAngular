import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SliderComponent } from '../slider/slider.component';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderOptions } from 'ngx-image-uploader-next';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule,FormsModule, SidebarComponent,
    SliderComponent],
    providers: [ArticleService],
  templateUrl: '../article-new/article-new.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent {
  public article: Article;
  public status: string;
  public options: ImageUploaderOptions;
  public is_edit: boolean;
  public page_title:string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', null, null);
    this.status = '';
    this.is_edit = true;
    this.page_title = "Editar Articulos";
    this.options = {
      thumbnailHeight: 150,
      thumbnailWidth: 410,
      uploadUrl: Global.url + 'upload-image/' + this.article._id,
      allowedImageTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
      maxImageSize: 50,
      autoUpload: false,
      cropAspectRatio: 1,
      fieldName: 'image'
    };
  }

  onSubmit() {
    this._articleService.update(this.article._id,this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;
          this._router.navigate(['/blog/articulo',this.article._id]);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  imageUpload(data: any) {
    let image_data = JSON.parse(data.response);
    this.article.image = image_data.image;
  }

  getArticle(){
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

  ngOnInit(){
    this.getArticle();
  }
}
