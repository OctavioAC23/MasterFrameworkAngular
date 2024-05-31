import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from "../slider/slider.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-formulario',
    standalone: true,
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.css',
    imports: [SliderComponent, CommonModule,SidebarComponent,FormsModule]
})
export class FormularioComponent {
    public user: any;
    constructor(){
        this.user = {
            nombre:'',
            apellido:'',
            bio:'',
            genero:''
        };
    }

    onSubmit(){
        alert("Formulacio Enviado");
        console.log(this.user);
    }
}
