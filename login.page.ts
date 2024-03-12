import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }
  async login() {
    // Fetch stored credentials from Capacitor Storage
    const storedUsername = await Preferences.get({ key: 'username' });
    const storedPassword = await Preferences.get({ key: this.username });

    // Check if entered credentials match stored credentials
    console.log("username: ", this.username);
    console.log("password: ", this.password);
    console.log('stored user: ', storedUsername);
    console.log('stored-passwrod: ', storedPassword);
    if (storedPassword.value === this.password) {
      // Redirect to the home page or dashboard upon successful login
      console.log('success');
      await Preferences.set({ key: 'username', value: this.username });
      this.router.navigate(['/home']);
    } else {
      // Display an error message or handle invalid credentials
      console.error('Invalid credentials. Please try again.');
    }
  }
}
