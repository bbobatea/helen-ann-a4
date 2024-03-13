import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-log-sleep',
  templateUrl: './log-sleep.component.html',
  styleUrls: ['./log-sleep.component.scss'],
})
export class LogSleepComponent implements OnInit {
  startTime: Date | null = null;
  endTime: Date | null = null;
  overnightSleepData: OvernightSleepData | null = null;
  diff: string | null = null;
  isStartTimeSet: boolean = false;
  loggedMood: number = 1;
  stanfordSleepiness: StanfordSleepinessData | null = null;
  username: string = '';

  constructor(private router: Router, private sleepService: SleepService) { }

  ngOnInit() {
    this.retrieveUsername();
  }

  
  updateStartTime() {
    this.startTime = new Date();
    this.isStartTimeSet = true;
    console.log("start: ", this.startTime);
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

  async updateEndTime() {
    this.endTime = new Date();
    this.isStartTimeSet = false;
    this.logSleepData();
    this.saveLoggedMood();

  }

  async logSleepData() {
    if (this.startTime && this.endTime) {
      // Create an instance of OvernightSleepData using start and end times
      this.overnightSleepData = new OvernightSleepData(this.startTime, this.endTime);
      try {
        const existingData = await Preferences.get({ key: this.username + " data"});
        console.log("existing data: ", existingData);
        let newData: OvernightSleepData[] = [];
        if (existingData.value) {
          newData = JSON.parse(existingData.value).map((item: any) => {
            return new OvernightSleepData(new Date(item.sleepStart), new Date(item.sleepEnd));
          });
        }
        console.log("overnight data: ", this.overnightSleepData)
        newData.push(this.overnightSleepData);
        console.log("new data: ", newData);
        await Preferences.set({
          key: this.username + " data",
          value: JSON.stringify(newData),
        });
        console.log('Sleep data stored successfully');
      } catch (error) {
        console.error('Error storing sleep data:', error);
      }
    } else {
      console.log('Please specify both start and end times.');
    }
  }

  async retrieveSleepData() {
    try {
      const { value } = await Preferences.get({ key: this.username + " data" });
      if (value) {
        this.overnightSleepData = JSON.parse(value).map((item: any) => {
          return new OvernightSleepData(new Date(item.sleepStart), new Date(item.sleepEnd));
          });
        console.log('Retrieved sleep data:', this.overnightSleepData);
      } else {
        console.log('No sleep data found in storage');
      }
    } catch (error) {
      console.error('Error retrieving sleep data:', error);
    }
  }

  totalHours(): string {
    if (this.startTime && this.endTime) {
      var sleepStart_ms = this.startTime.getTime();
      var sleepEnd_ms = this.endTime.getTime();
      var difference_ms = sleepEnd_ms - sleepStart_ms;
      this.diff = Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
      console.log("summary: ", this.diff);
      return this.diff;
    } else {
      return '';
    }
  }

  async saveLoggedMood() {
    console.log("mood", this.loggedMood);
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
