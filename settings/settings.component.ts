import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
	username: string = '';
	newPassword: string = '';

  constructor(private router: Router) { }

  async ngOnInit() {
	await this.retrieveUsername();
  }

  async retrieveUsername() {
    try {
      const { value } = await Preferences.get({ key: 'activeUser' });
      if (value) {
        this.username = value;
        console.log("this.username: ", this.username);
      } else {
        console.log('No username found in storage');
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  }

  signOut() {
    this.router.navigate(['/login']);
  }

  async changePassword() {
	try {
        await Preferences.set({ key: this.username, value: this.newPassword });
        console.log('Password updated successfully.');
    } catch (error) {
        console.error('Error updating username:', error);
    }
  }

	goToHome() {
		this.router.navigate(['/home']);
	}

	logSleep() {
	this.router.navigate(['/log-sleep-component']);
	const currentDateTime = new Date();
	}

	viewData() {
		this.router.navigate(['/data-view-component']);
	}

	goToSettings() {
		this.router.navigate(['/settings-component']);
	}

	goToGoals() {
		this.router.navigate(['/sleep-goals-component']);
	}

}
