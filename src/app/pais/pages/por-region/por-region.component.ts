import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];

  getClaseCss(region: string): string {
    return region === this.regionActiva
    ? 'btn btn-primary me-2'
    : 'btn btn-outline-primary me-2'
  }
 
  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) { return; }
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region).subscribe(paises => {
      this.paises = paises;
    })
  }

}
