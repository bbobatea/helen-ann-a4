import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-display-logged-moods',
  templateUrl: './display-logged-moods.page.html',
  styleUrls: ['./display-logged-moods.page.scss'],
})
export class DisplayLoggedMoodsPage implements OnInit {
  data: any;
  stanfordSleepinessList: any;
  username: string = '';
	sleepyData: StanfordSleepinessData[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.data = navigation.extras.state['data'];
      this.stanfordSleepinessList = navigation.extras.state['stanfordSleepinessList'];
    }
  }

  async ngOnInit() {
    await this.retrieveUsername();
      this.showLoggedMoods();
    }


  async retrieveUsername() {
    try {
      const { value } = await Preferences.get({ key: 'username' });
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

  async showLoggedMoods() {
    const { value : moodValue } = await Preferences.get({ key: this.username + "_loggedMood" });
    if (moodValue) {
      this.sleepyData = JSON.parse(moodValue).map((item: any) => {
        return new StanfordSleepinessData(item.loggedValue, new Date(item.loggedAt));
      });
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
