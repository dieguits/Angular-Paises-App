import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  termino: string = 'colombia';
  isError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.isError = false;
    this.termino = termino;
    console.log(this.termino)

    this.paisService.buscarPais(termino)
      .subscribe(paises => {
        this.paises = paises;
      }, (err) => {
        console.error('Error: ', err);
        this.isError = true;
        this.paises = [];
      })
  }

  sugerencias(termino: any) {
    this.mostrarSugerencias = true;
    this.isError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0, 5),
        err => this.paisesSugeridos = []
      )
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);    
  }

}
