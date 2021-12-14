import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  constructor(private http: HttpClient) {}
  private _baseUrl: string = environment.baseUrl;

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this._baseUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this._baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this._baseUrl}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this._baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this._baseUrl}/heroes/${heroe.id}`, heroe);
  }

  eliminarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this._baseUrl}/heroes/${id}`);
  }
}
