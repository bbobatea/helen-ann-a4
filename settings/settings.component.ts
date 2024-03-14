import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { UpdatePasswordComponent } from '../update-password/update-password.component';
import { DeleteAccountPage } from '../delete-account/delete-account.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
	username: string = '';

  constructor(private router: Router, private modalcontroller: ModalController) { }
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

  async openChangePasswordModal() {
    const modal = await this.modalcontroller.create({
      component: UpdatePasswordComponent,
      componentProps: {
        username: this.username, 
      },
    });
    return await modal.present();
  }

  async delete() {
    const modal = await this.modalcontroller.create({
      component: DeleteAccountPage,
      componentProps: {
        username: this.username, 
      },
    });
    return await modal.present();
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
