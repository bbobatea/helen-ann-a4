import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { OvernightSleepData } from './data/overnight-sleep-data';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class LogSleepServiceService {
  private startTimeSubject: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  private endTimeSubject: BehaviorSubject<Date | null> = new BehaviorSubject<Date | null>(null);
  overnightSleepData: OvernightSleepData | null = null;
  diff: string | null = null;
  startTime!: Date | null;
  endTime!: Date | null;
  
  constructor() { }

  startSleepTimer(): void {
    this.startTimeSubject.next(new Date());
  }

  endSleepTimer(): void {
    this.endTimeSubject.next(new Date());
  }

  getStartTime(): Date | null {
    return this.startTime;
  }

  getEndTime(): Date | null {
    return this.endTime;
  }

  clearTimers(): void {
    this.startTimeSubject.next(null);
    this.endTimeSubject.next(null);
  }

  async logSleepData(username : string): Promise<void> {
    this.startTime = this.startTimeSubject.getValue();
    this.endTime = this.endTimeSubject.getValue();
    if (this.startTime && this.endTime) {
      this.overnightSleepData = new OvernightSleepData(this.startTime, this.endTime);
      try {
        const existingData = await Preferences.get({ key: username + " data"});
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
          key: username + " data",
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

  totalHours(): string {
    const startTime = this.startTimeSubject.getValue();
    const endTime = this.endTimeSubject.getValue();
    if (startTime && endTime) {
      var sleepStart_ms = startTime.getTime();
      var sleepEnd_ms = endTime.getTime();
      var difference_ms = sleepEnd_ms - sleepStart_ms;
      this.diff = Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes.";
      console.log("summary: ", this.diff);
      return this.diff;
    } else {
      return '';
    }
  }
}
