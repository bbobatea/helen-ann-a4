import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  ngOnInit() {
  }

  async signUp() {
    try {
      // Check if username already exists
      const existingUser = await Preferences.get({ key: this.username });
      if (existingUser.value) {
        await this.presentErrorAlert();
        console.error('Username already exists. Please choose a different username.');
        return;
      }

      // Store new user credentials
      await Preferences.set({ key: this.username, value: this.password });

      // Redirect to login page
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

  async login() {
    this.router.navigate(['/login']);
  }
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Username Taken',
      message: 'Username is already taken, Please use a different username',
      buttons: ['OK']
    });

    await alert.present();
  }
}
