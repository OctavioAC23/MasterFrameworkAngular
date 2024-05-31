import { Component,Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '../../models/article';
import { Global } from '../../services/global';
import { MomentModule } from 'ngx-moment';
import 'moment/locale/es';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule,MomentModule,RouterModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  @Input() articles: Article[] | undefined;
  public url: string;
  constructor(
  ){
    this.url = Global.url;
  }
}
