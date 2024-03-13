import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepData } from '../data/sleep-data';
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
	sleepData: (SleepData | Date)[] = [];
	username: string = '';

  constructor(private router: Router, private sleepService: SleepService, private navCtrl: NavController) { }


  async ngOnInit() {
	await this.retrieveUsername();
		this.updateData();
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
  
  async updateData() {
	const { value } = await Preferences.get({ key: this.username + " data" });
	if (value) {
	  this.overnightData = JSON.parse(value).map((item: any) => {
		return new OvernightSleepData(new Date(item.sleepStart), new Date(item.sleepEnd));
	  });
	}
	console.log("h", this.overnightData);
    const { value : moodValue } = await Preferences.get({ key: this.username + "_loggedMood" });
    if (moodValue) {
      this.sleepyData = JSON.parse(moodValue);
	}
	console.log("json parse mood value: ", this.sleepyData);
	console.log("a", this.sleepyData);
	this.sleepData = this.sleepService.getSleepData(); //use :between each overnight sleep object log moods in <--
	console.log("hh", this.sleepData);
	this.sleepData = this.sleepService.getSleepData(); 
  }

  displayLoggedMoods() {
	this.router.navigate(['/display-logged-moods']);
  }

  showLoggedMoods(data:any) {
	console.log("here ", this.sleepyData);
	const index = this.sleepyData.indexOf(data);
	console.log("index: ", index);
	let stanfordSleepinessList: StanfordSleepinessData[] = [];

	//checking for mood logs while user was asleep
	for (let i=index - 1; i >= 0; i-- ) {
		const current = this.sleepData[i];
		console.log("sleepdata: ", current);
		//go backwards from index, check if it happened between sleep start and sleep end, if it is then add to list 
		// if its the same day as start time, 
		// if instance is a OvernightSleepData, OR Date break.
		if (current instanceof StanfordSleepinessData) {
			const currentloggedData = new Date(current.loggedAt);
        	const givenData = new Date(data.sleepStart);
			if (
				currentloggedData.getFullYear() === givenData.getFullYear() &&
				currentloggedData.getMonth() === givenData.getMonth() &&
				currentloggedData.getDate() === givenData.getDate()
			) {
				stanfordSleepinessList.push(current);
			}
		} else if (current instanceof OvernightSleepData || current instanceof Date) {
			break;
		}
	}

	// can find next instance of OvernightsleepData if it exists --> then use that sleepstart time to check 
	//checking for mood logs after user wakes up
	for (let i=index + 1; i < this.sleepData.length; i++) {
		const current = this.sleepData[i];
		// or just change sleepData object to also have something that indicates when a start button was pressed.
		if (current instanceof StanfordSleepinessData) {
			//checking if were on the same day 
			const currentloggedData = new Date(current.loggedAt);
        	const givenData = new Date(data.sleepEnd);

			// if same day
			if (currentloggedData.getFullYear() === givenData.getFullYear() &&
				currentloggedData.getMonth() === givenData.getMonth() &&
				currentloggedData.getDate() === givenData.getDate()
				) {
				// if same time, or after sleepEnd
				if (current.loggedAt.getTime() >= data.sleepEnd.getTime()) {
					// add to list
					stanfordSleepinessList.push(current);
				}
			}
			// if same time or is before time
			// add to the list if its the same day + check time 
		} else if (current instanceof OvernightSleepData || current instanceof Date) {
			break;
		}
	}
	console.log(stanfordSleepinessList);
	console.log("stanfordSleepinessList:", stanfordSleepinessList);

	this.navCtrl.navigateForward('/display-logged-moods', {
		state: {
		  data: data,
		  stanfordSleepinessList: stanfordSleepinessList
		}
	  });
  }

  deleteItem(data: any) {
	// deletes the data upon sliding the card and selecting delete NOT FUNCTIONAL RN (NEED TO IMPLEMENT!)
	console.log("delete");
	const index = this.sleepData.indexOf(data);
	const index1 = this.overnightData.indexOf(data);
	if (index !== -1 && index1 !== -1) {
		this.sleepData.splice(index, 1);
		this.overnightData.splice(index, 1);
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
