import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
    mat-card {
      margin-bottom: 20px;
    }
  `]
})
export class HeroeTarjetaComponent {
  @Input() heroe = {} as Heroe;
}
