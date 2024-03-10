import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepData } from '../data/sleep-data';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent  implements OnInit {
	overnightData: OvernightSleepData[] = [];
	sleepyData: StanfordSleepinessData[] = [];
	sleepData: SleepData[] = [];

  constructor(private router: Router, private sleepService: SleepService) { }

  ngOnInit() {
	this.updateData();
  }

  updateData() {
	this.overnightData = this.sleepService.getOvernightData();
	console.log("h", this.overnightData);
	this.sleepyData = this.sleepService.getSleepinessData();
	console.log("a", this.sleepyData);
	this.sleepData = this.sleepService.getSleepData(); //use :between each overnight sleep object log moods in <--
	console.log("hh", this.sleepData);
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
