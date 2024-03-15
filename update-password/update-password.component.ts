import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent  implements OnInit {
  constructor(private modalController: ModalController) {}
	username: string = '';
	newPassword: string = '';
  ngOnInit() {
    this.retrieveUsername();
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

  async updatePassword() {
    // Logic to update the password
    try {
      await Preferences.set({ key: this.username, value: this.newPassword });
      console.log('Password updated successfully.');
      this.cancel();
    } catch (error) {
        console.error('Error updating username:', error);
    }
  }

  async cancel() {
    await this.modalController.dismiss();
  }
}
