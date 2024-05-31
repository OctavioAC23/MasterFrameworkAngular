import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'espar',
  standalone: true
})
export class EsparPipe implements PipeTransform {
  transform(value: number): string {
     var Resultado = "es Impar";
    if (value%2 == 0){
        Resultado = "es Par";
    }
    return "El año es "+value+" y "+Resultado;
  }
}
