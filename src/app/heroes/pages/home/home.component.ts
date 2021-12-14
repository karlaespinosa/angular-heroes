import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/usuario.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      padding: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  get auth(): Usuario {
    return this._authService.auth;
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['./auth/login']);
  }
}
