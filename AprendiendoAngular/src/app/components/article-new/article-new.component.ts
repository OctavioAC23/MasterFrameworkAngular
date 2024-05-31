import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ImageUploaderModule, ImageUploaderOptions } from 'ngx-image-uploader-next';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SliderComponent } from "../slider/slider.component";
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Global } from '../../services/global';

@Component({
  selector: 'app-article-new',
  standalone: true,
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ImageUploaderModule,
    SidebarComponent,
    SliderComponent
  ],
  providers: [ArticleService],
})
export class ArticleNewComponent {
  public article: Article;
  public status: string;
  public options: ImageUploaderOptions;
  public page_title:string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.article = new Article('', '', '', null, null);
    this.status = '';
    this.page_title = "Crear Articulos";
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
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;
          this._router.navigate(['/blog']);
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
}
