import { Injectable } from '@angular/core';

export interface Asignatura {
  id: string;
  nombre: string;
  codigo: string;
  docenteId: string;
}

export interface Asistencia {
  id: string;
  asignaturaId: string;
  alumnoId: string;
  fecha: string;
  presente: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  private readonly ASIGNATURAS_KEY = 'asignaturas';
  private readonly ASISTENCIAS_KEY = 'asistencias';

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    if (!localStorage.getItem(this.ASIGNATURAS_KEY)) {
      const asignaturas: Asignatura[] = [
        { id: '1', nombre: 'Programación Web', codigo: 'PGY4121', docenteId: '1' },
        { id: '2', nombre: 'Base de Datos', codigo: 'BDD4121', docenteId: '2' },
        { id: '3', nombre: 'Arquitectura de Software', codigo: 'ASW4131', docenteId: '1' },
        { id: '4', nombre: 'Desarrollo Móvil', codigo: 'DMV4133', docenteId: '2' },
        { id: '5', nombre: 'Calidad de Software', codigo: 'CSW4124', docenteId: '1' },
        { id: '6', nombre: 'Seguridad Informática', codigo: 'SEG4122', docenteId: '2' },
        { id: '7', nombre: 'Inteligencia Artificial', codigo: 'IAI4125', docenteId: '1' },
        { id: '8', nombre: 'Redes y Comunicaciones', codigo: 'REC4126', docenteId: '2' }
      ];
      localStorage.setItem(this.ASIGNATURAS_KEY, JSON.stringify(asignaturas));
    }

    if (!localStorage.getItem(this.ASISTENCIAS_KEY)) {
      localStorage.setItem(this.ASISTENCIAS_KEY, JSON.stringify([]));
    }
  }

  getAsignaturasDocente(docenteId: string): Asignatura[] {
    const asignaturas = JSON.parse(localStorage.getItem(this.ASIGNATURAS_KEY) || '[]');
    return asignaturas.filter((a: Asignatura) => a.docenteId === docenteId);
  }

  getAsignaturasAlumno(): Asignatura[] {
    // En un caso real, esto vendría de una relación alumno-asignatura
    return JSON.parse(localStorage.getItem(this.ASIGNATURAS_KEY) || '[]');
  }

  registrarAsistencia(asistencia: Omit<Asistencia, 'id'>): void {
    const asistencias = JSON.parse(localStorage.getItem(this.ASISTENCIAS_KEY) || '[]');
    const nuevaAsistencia = {
      ...asistencia,
      id: Date.now().toString(),
    };
    asistencias.push(nuevaAsistencia);
    localStorage.setItem(this.ASISTENCIAS_KEY, JSON.stringify(asistencias));
  }

  getAsistenciasAlumno(alumnoId: string, asignaturaId: string): Asistencia[] {
    const asistencias = JSON.parse(localStorage.getItem(this.ASISTENCIAS_KEY) || '[]');
    return asistencias.filter(
      (a: Asistencia) => a.alumnoId === alumnoId && a.asignaturaId === asignaturaId
    );
  }
} 