import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';
import { LogSleepServiceService } from '../log-sleep-service.service';
import { HourSleptPage } from '../hour-slept/hour-slept.page';
import { ModalController } from '@ionic/angular';


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
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  interval: any;

  constructor(private router: Router, private sleepService: LogSleepServiceService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.retrieveUsername();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (++this.seconds === 60) {
        this.seconds = 0;
        if (++this.minutes === 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
    }, 1000);
  }

  updateStartTime() {
    this.isStartTimeSet = true;
    this.sleepService.startSleepTimer();
    this.startTimer();
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

  async updateEndTime() {
    this.isStartTimeSet = false;
    this.sleepService.endSleepTimer();
    this.sleepService.logSleepData(this.username);
    this.saveLoggedMood();
    clearInterval(this.interval);
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
    return this.sleepService.totalHours();
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
  formatDate(dateTime: number): string {
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

  timerClock() {
  }

	goToHome() {
		this.router.navigate(['/home']);
	}

	logSleep() {
	this.router.navigate(['/log-sleep-component']);
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
