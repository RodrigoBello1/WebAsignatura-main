import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordType: string = 'password';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  async changePassword() {
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      await this.showAlert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas nuevas no coinciden');
      return;
    }

    if (this.authService.changePassword(this.currentPassword, this.newPassword)) {
      await this.showAlert('Éxito', 'Contraseña cambiada correctamente');
      this.router.navigate(['/home']);
    } else {
      await this.showAlert('Error', 'La contraseña actual no es correcta');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
