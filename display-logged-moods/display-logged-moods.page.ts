import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-logged-moods',
  templateUrl: './display-logged-moods.page.html',
  styleUrls: ['./display-logged-moods.page.scss'],
})
export class DisplayLoggedMoodsPage implements OnInit {
  data: any;
  stanfordSleepinessList: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.data = navigation.extras.state['data'];
      this.stanfordSleepinessList = navigation.extras.state['stanfordSleepinessList'];
    }
  }

  ngOnInit() {
    console.log(this.stanfordSleepinessList);
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
}