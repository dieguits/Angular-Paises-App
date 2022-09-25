import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  termino: string = 'colombia';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.isError = false;
    this.termino = termino;
    console.log(this.termino)

    this.paisService.buscarCapital(termino)
      .subscribe(paises => {
        this.paises = paises;
      }, (err) => {
        console.error('Error: ', err);
        this.isError = true;
        this.paises = [];
      })
  }

  sugerencias(termino: any) {
    this.isError = false;
  }

}
