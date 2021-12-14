import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
    }
  `]
})
export class HeroeComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _router: Router
  ) {}

  heroe!: Heroe;

  ngOnInit(): void {
    this._activatedRoute.params
    .pipe(
      switchMap(({ id }) => this._heroesService.getHeroePorId(id))
    )
    .subscribe(hero => this.heroe = hero);
  }

  regresar(): void {
    this._router.navigate(['/heroes/listado']);
  }
}
