# Firebase Air Pollution Alert

Using firebase to allow signed in users to set air pollution alerts for their city. This was a little project to try out using firebase as a backend system.

[LIVE DEMO HERE]( https://actuallymentor.github.io/firebase-air-pollution-alert/ )

Currently implemented:
* Authentication
    * Registration
    * Login
* Adding profile information
    * Name
    * Adding/deleting cities you want to track pollution levels of
* API based pollution data displayed per city
    * Basic interpretation based on wikipedia

Not yet implemented:
* Email alerts

My intention was to set up a firebase function triggered by an external cron. The free spark plan though does not allow for non-Google API calls, which I need to get the pollution data. Oh well.

**Credits**

Air quality from [aqicn]( http://aqicn.org/ )