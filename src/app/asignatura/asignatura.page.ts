import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
    console.log('Cerrando sesión...');
    this.router.navigate(['/home']);
  }
  
}
