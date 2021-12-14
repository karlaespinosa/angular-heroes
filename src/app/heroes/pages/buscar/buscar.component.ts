import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  constructor(private _heroesService: HeroesService) {}

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  ngOnInit(): void {
  }

  buscar(): void {
    this._heroesService.getSugerencias(this.termino).subscribe(heros => {
      this.heroes = heros;
    })
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this._heroesService.getHeroePorId(heroe.id!).subscribe(hero => {
      this.heroeSeleccionado = hero;
    })
  }
}
