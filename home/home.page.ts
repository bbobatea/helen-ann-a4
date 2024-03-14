import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	stanfordSleepiness: StanfordSleepinessData | null = null;
	loggedMood: number = 1;
	username: string = '';

  constructor(private router: Router) {
	}

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


	async saveLoggedMood() {
		this.stanfordSleepiness = new StanfordSleepinessData(this.loggedMood);
		try {
		  const existingData = await Preferences.get({ key: this.username + "_loggedMood"});
		  console.log("existing data: ", existingData);
		  let newMoodData: StanfordSleepinessData[] = [];
		  if (existingData.value) {
			newMoodData = JSON.parse(existingData.value).map((item: any) => {
			  return new StanfordSleepinessData(item.loggedValue, new Date(item.loggedAt));
			});
		  }
		  newMoodData.push(this.stanfordSleepiness);
		  console.log("updated mood data: ", newMoodData);
		  await Preferences.set({ key: this.username + '_loggedMood', value: JSON.stringify(newMoodData) });
		  console.log('Logged mood saved');
		  
		  // Log retrieved mood data after saving
		  const { value } = await Preferences.get({ key: this.username + "_loggedMood" });
		  if (value) {
			const retrievedMood = JSON.parse(value);
			console.log('Retrieved mood:', retrievedMood);
		  } else {
			console.log('No mood data found in storage');
		  }
		} catch (error) {
		  console.error('Error saving logged mood: ', error);
		}
	}

	async scheduleNotification() {
		await LocalNotifications.schedule({
		  notifications: [
			{
			  title: 'Notification Title',
			  body: 'Notification Body',
			  id: 1,
			  schedule: { at: new Date(Date.now() + 1000 * 5) } // Notification will be fired 5 seconds from now
			}
		  ]
		});
	}

	
	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
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
