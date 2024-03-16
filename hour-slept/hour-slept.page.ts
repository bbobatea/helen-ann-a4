import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-hour-slept',
  templateUrl: './hour-slept.page.html',
  styleUrls: ['./hour-slept.page.scss'],
})
export class HourSleptPage implements OnInit {
  @Input() username: string | undefined;
  @Input() totalSleep: string | undefined;
  @Input()
  startTime!: Date;
  @Input()
  endTime!: Date;
  @Input() sleepMood: string | undefined;
  @Input() moodSummary: string = '';
  timeString: string = '';
  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    console.log("starttime: ", this.startTime);
    console.log("endtime: ", this.endTime);
    console.log("sleepmood: ", this.moodSummary);
  }
  async cancel() {
    await this.modalController.dismiss();
  }
  
  formatTime(date : Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    this.timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return this.timeString;
  }
  
  viewData() {
		this.router.navigate(['/data-view-component']);
    this.cancel();
	}
}
