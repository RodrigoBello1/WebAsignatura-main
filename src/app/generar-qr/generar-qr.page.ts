import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignaturasService } from '../services/asignaturas.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  asignaturaId: string = '';
  qrData: string = '';

  constructor(
    private route: ActivatedRoute,
    private asignaturasService: AsignaturasService
  ) {}

  ngOnInit() {
    this.asignaturaId = this.route.snapshot.paramMap.get('id') || '';
    this.generarCodigoQR();
  }

  generarCodigoQR() {
    const fecha = new Date().toISOString();
    this.qrData = JSON.stringify({
      asignaturaId: this.asignaturaId,
      fecha: fecha
    });
  }
} 