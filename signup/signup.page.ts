import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  async signUp() {
    try {
      // Check if username already exists
      const existingUser = await Preferences.get({ key: this.username });
      if (existingUser.value) {
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
}
