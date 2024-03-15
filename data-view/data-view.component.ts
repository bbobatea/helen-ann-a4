import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent  implements OnInit {
	overnightData: OvernightSleepData[] = [];
	sleepyData: StanfordSleepinessData[] = [];
	username: string = '';
	selectedTab: string = 'overnightData';

  constructor(private router: Router) { }
  
  ngOnInit() {
	this.tabChanged();
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
  
  async updateData() {
	try {
		await this.retrieveUsername();
		const { value } = await Preferences.get({ key: this.username + " data" });
		if (value) {
		this.overnightData = JSON.parse(value).map((item: any) => {
			return new OvernightSleepData(new Date(item.sleepStart), new Date(item.sleepEnd));
		});
		}
		console.log("h", this.overnightData);
	} catch (error) {
		console.error("No data found: ", error);
	}
  }

  tabChanged() {
    if (this.selectedTab === 'loggedMoods') {
      this.displayLoggedMoods();
    } else {
     this.updateData();
    }
  }

  async displayLoggedMoods() {
	try {
		await this.retrieveUsername();
		const { value : moodValue } = await Preferences.get({ key: this.username + "_loggedMood" });
		if (moodValue) {
		this.sleepyData = JSON.parse(moodValue).map((item: any) => {
			return new StanfordSleepinessData(item.loggedValue, new Date(item.loggedAt));
		});
		}
	} catch (error) {
		console.error("No data found: ", error);
	}
  }

  formatDate(dateTime: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateTime).toLocaleString('en-US', options);
  }

  async deleteOvernightItem(data: any) {
    // deletes the data upon sliding the card and selecting delete NOT FUNCTIONAL RN (NEED TO IMPLEMENT!)
    console.log("delete");
    const index1 = this.overnightData.indexOf(data);
    if (index1 !== -1) {
        this.overnightData.splice(index1, 1);
    }
	await Preferences.set({
		key: this.username + " data",
		value: JSON.stringify(this.overnightData),
	  });
  }

  async deleteMoodItem(data: any) {
    // deletes the data upon sliding the card and selecting delete NOT FUNCTIONAL RN (NEED TO IMPLEMENT!)
    console.log("delete");
    const index1 = this.sleepyData.indexOf(data);
    if (index1 !== -1) {
        this.sleepyData.splice(index1, 1);
    }
	await Preferences.set({
		key: this.username + "_loggedMood",
		value: JSON.stringify(this.sleepyData),
	  });
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
