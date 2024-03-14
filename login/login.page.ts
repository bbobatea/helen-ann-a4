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
    try {
      // Fetch stored password using the entered username as the key
      const storedPassword = await Preferences.get({ key: this.username });
      
      // Check if stored password matches the entered password
      if (storedPassword.value === this.password) {
          // Set the current username as the active user
          await Preferences.set({ key: 'activeUser', value: this.username });
          console.log("active user; ", this.username);
          // Redirect to the home page or dashboard upon successful login
          this.router.navigate(['/home']);
      } else {
          console.error('Invalid credentials. Please try again.');
      }
  } catch (error) {
      console.error('Error retrieving stored password:', error);
  }
}
}
