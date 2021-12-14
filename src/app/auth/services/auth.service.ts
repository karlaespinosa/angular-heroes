import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  private _baseUrl: string = environment.baseUrl;
  private _auth: Usuario | undefined;

  get auth(): Usuario {
    return { ...this._auth! };
  }

  verificarAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    return this._http.get<Usuario>(`${this._baseUrl}/usuarios/1`)
    .pipe(
      map(auth => {
        this._auth = auth;
        return true;
      })
    )
  }

  login(): Observable<Usuario> {
    return this._http.get<Usuario>(`${this._baseUrl}/usuarios/1`)
    .pipe(
      tap<Usuario>(res => this._auth = res),
      tap<Usuario>(res => localStorage.setItem('token', res.id.toString()))
    )
  }

  logout(): void {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
