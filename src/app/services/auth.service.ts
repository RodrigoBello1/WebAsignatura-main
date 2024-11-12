import { Injectable } from '@angular/core';

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  clave: string;
  tipo: 'docente' | 'alumno';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'user_data';
  private readonly DB_KEY = 'local_db';

  constructor() {
    this.initializeDB();
  }

  private initializeDB() {
    if (!localStorage.getItem(this.DB_KEY)) {
      const initialDB = {
        docentes: [
          {
            id: "1",
            nombre: "Ana García",
            correo: "ana@duoc.docente.cl",
            clave: "1234",
            tipo: "docente"
          },
          {
            id: "2",
            nombre: "Luis Pérez",
            correo: "luis@duoc.docente.cl",
            clave: "1234",
            tipo: "docente"
          }
        ],
        alumnos: [
          {
            id: "1",
            nombre: "Pedro Silva",
            correo: "pedro@duocuc.alumno.cl",
            clave: "1234",
            tipo: "alumno"
          },
          {
            id: "2",
            nombre: "Diana Torres",
            correo: "diana@duocuc.alumno.cl",
            clave: "1234",
            tipo: "alumno"
          }
        ]
      };
      localStorage.setItem(this.DB_KEY, JSON.stringify(initialDB));
    }
  }

  login(correo: string, password: string): boolean {
    const db = JSON.parse(localStorage.getItem(this.DB_KEY) || '{}');
    const usuario = [...db.docentes, ...db.alumnos].find(
      u => u.correo === correo && u.clave === password
    );

    if (usuario) {
      this.saveUserData(usuario);
      return true;
    }
    return false;
  }

  saveUserData(userData: Usuario): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
  }

  getUserData(): Usuario | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getUserData();
  }

  changePassword(oldPassword: string, newPassword: string): boolean {
    const userData = this.getUserData();
    if (!userData) return false;

    const db = JSON.parse(localStorage.getItem(this.DB_KEY) || '{}');
    const collection = userData.tipo === 'docente' ? 'docentes' : 'alumnos';
    
    const userIndex = db[collection].findIndex(
      (u: Usuario) => u.id === userData.id && u.clave === oldPassword
    );

    if (userIndex !== -1) {
      db[collection][userIndex].clave = newPassword;
      localStorage.setItem(this.DB_KEY, JSON.stringify(db));
      return true;
    }
    return false;
  }
} 