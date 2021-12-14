import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 10px;
    }
  `]
})
export class AgregarComponent implements OnInit {
  constructor(
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  publishers = [
    {
      id: 'DC Comics',
      description: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  ngOnInit(): void {
    if(!this._router.url.includes('editar')) return;

    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroesService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) return;
    
    if(this.heroe.id) {
      // Actualizar
      this._heroesService.actualizarHeroe(this.heroe).subscribe(heroe => {
        this._router.navigate(['/heroes', heroe.id]);
      });
    } else {
      // Crear
      this._heroesService.agregarHeroe(this.heroe).subscribe(heroe => {
        this._router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }

  eliminar(): void {
    this._heroesService.eliminarHeroe(this.heroe.id!).subscribe(() => {
      this._router.navigate(['/heroes/listado']);
    });
  }
}
