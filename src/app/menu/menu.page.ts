import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AsignaturasService, Asignatura } from '../services/asignaturas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: any;
  asignaturas: Asignatura[] = [];

  constructor(
    private authService: AuthService,
    private asignaturasService: AsignaturasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getUserData();
    if (this.usuario.tipo === 'docente') {
      this.asignaturas = this.asignaturasService.getAsignaturasDocente(this.usuario.id);
    } else {
      this.asignaturas = this.asignaturasService.getAsignaturasAlumno();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  generarQR(asignatura: Asignatura) {
    this.router.navigate(['/generar-qr', asignatura.id]);
  }

  leerQR(asignatura: Asignatura) {
    this.router.navigate(['/leer-qr', asignatura.id]);
  }

  verAsistencias(asignatura: Asignatura) {
    this.router.navigate(['/asistencias', asignatura.id]);
  }
}
