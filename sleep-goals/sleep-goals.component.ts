import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sleep-goals',
  templateUrl: './sleep-goals.component.html',
  styleUrls: ['./sleep-goals.component.scss'],
})
export class SleepGoalsComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

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
