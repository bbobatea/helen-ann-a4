import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';

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

  constructor(private router: Router, private sleepService: SleepService) { }

  ngOnInit() {}

  updateStartTime() {
    this.startTime = new Date();
    this.isStartTimeSet = true;
    console.log("start: ", this.startTime);
  }

  updateEndTime() {
    this.endTime = new Date();
    this.isStartTimeSet = false;
    console.log("end: ", this.endTime);
    if (this.startTime && this.endTime) {
      // Create an instance of OvernightSleepData using start and end times
      this.overnightSleepData = new OvernightSleepData(this.startTime, this.endTime);
      // Log the data to sleep service data saver
      this.sleepService.logOvernightData(this.overnightSleepData);
      const allOvernightData = this.sleepService.getOvernightData();
      // print out the data using a getter method
      console.log("overnight data: ", allOvernightData);
    } else {
      console.log('Please specify both start and end times.');
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

  saveLoggedMood() {
    console.log("mood", this.loggedMood);
    this.stanfordSleepiness = new StanfordSleepinessData(this.loggedMood);
    console.log("objectt", this.stanfordSleepiness);
    this.sleepService.logSleepinessData(this.stanfordSleepiness);
    const sleep = this.sleepService.getSleepinessData();
    console.log(sleep, "sleep");
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
