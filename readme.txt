--Readme document for *author(s)*, *email(s)*, *UCI id(s)*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

*/20
- 3/3 The ability to log overnight sleep
- 3/3 The ability to log sleepiness during the day
- 3/3 The ability to view these two categories of logged data
- 3/3 Either using a native device resource or backing up logged data
- 3/3 Following good principles of mobile design
- 3/3 Creating a compelling app
- 2/2 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?

We took about 25 hours total to complete this assignment.

3. What online resources did you consult when completing this assignment? (list specific URLs)

These are the sources we consulted: 
  https://www.geeksforgeeks.org/compare-two-dates-using-javascript/
  https://stackoverflow.com/questions/22039991/how-to-compare-two-dates-along-with-time-in-java
  https://stackoverflow.com/questions/33280356/content-not-scrolling-in-ionic
  https://stackoverflow.com/questions/54891110/router-getcurrentnavigation-always-returns-null
  https://stackoverflow.com/questions/12991351/how-to-force-image-resize-and-keep-aspect-ratio
  https://www.w3schools.com/js/tryit.asp?filename=trychartjs_lines
  https://www.freecodecamp.org/news/how-to-make-bar-and-line-charts-using-chartjs-in-angular/
  https://www.chartjs.org/docs/latest/
  https://ionicframework.com/docs/angular/navigation
  https://www.w3schools.com/howto/howto_css_login_form.asp
  https://forum.ionicframework.com/t/ionic-vue-capacitor-preferences/231157
  https://capacitorjs.com/docs/apis/preferences
  https://stackoverflow.com/questions/47897118/how-to-make-clock-in-typescript#:~:text=calling%20print()%20.-,function%20clockRun()%20%7B%20timeGenerate()%3B%20let%20newClock%20%3D%20new%20Clock,example%20(keep%20it%20simple!)
  https://www.dhiwise.com/post/simplify-event-timing-and-scheduling-with-typescript-timer

4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?

We did not consult any classmates or individuals as part of this assignment.

5. Is there anything special we need to know in order to run your code?

We used a few things which required installs, such as chart.js, capacitor preferences, 

--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?

No, we did not design our app with a particular type of user in mind. We decided to create a user-intuitive app for any person that would like to track their sleep, moods, and 
be able to look at their data in logs and graphical displays.

7. Did you design your app specifically for iOS or Android, or both?

We designed our app specifically for iOS. This app can also work on Andriod, although it may not be as visually appealing.

8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?

A person can log overnight sleep in the app by pressing on the 'Start Logging Sleep' button on the Log Sleep page, which will record the time from which they press the button to when they press the 'End Logging Sleep' button. We chose to support logging sleep in this way as it was the most convenient way to log sleep -- we figured if users had to continually manually log in their sleep time, they would find it bothersome.

9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?

A person can log their sleepiness during the day in the app by simply using the slider on either the home page, or the Log Sleep page, and clicking on the log mood button to save it. We chose to support logging sleepiness in this way because it was the most organized way to display the moods; additionally, it makes it easier for the user to log their sleepiness/mood as well.

10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?

A person can view the data they logged in our app by going to the 'View Data' page, where the user can either select on 'Logged Sleep' or 'Logged Moods' to view the respective logs for each which are displayed on ion cards. We chose to support viewing logged data in this way as it seemed the most organized way to display the data -- the user knows which page contains all the data collected, and can view it by going there.

11. Which feature choose--using a native device resource, backing up logged data, or both?

We chose backing up logged data as a feature. Users create/login to an account that will save all of their sleep and sleepiness data on a device.

12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?

We did not use a native device resource.

13. If you backed up logged data, where does it back up to?
It backs up to the preferences local storage from capacitor which the user must install on their terminal:
npm install @capacitor/preferences
npx cap sync

14. How does your app implement or follow principles of good mobile design?

Our app implements and follows priciples of good mobile design such as displaying a error login message if user tries to login with a nonexisting account or incorrect login credentials. User is also able to view their data after logging their sleep and seeing their summary and amount of hours they slept for. A timer is also started when user starts to log sleep and a clock is displayed on the home page so user can see how late or early it currently is. User is also able to log mood at any time. In case user makes a mistake when logging sleep or mood, they are able to delete that data and the app saves it. User is also able to change password of their account or delete their account in which they are warned that all data will be lost and cannot be recovered.
