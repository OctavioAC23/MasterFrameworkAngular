import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public searchString: string|undefined;
  goSearch(){
    this._router.navigate(['/buscar',this.searchString]);
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ){

  }
}
