// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'firebase',
  firebaseConfig: {
    apiKey: 'AIzaSyAo-oI9nN2ZDlJ-a2TY2bxPRBYnOhAs0rg',
    authDomain: 'poc-gsl.firebaseapp.com',
    databaseURL: 'https://poc-gsl.firebaseio.com',
    projectId: 'poc-gsl',
    storageBucket: 'poc-gsl.appspot.com',
    messagingSenderId: '36286736841',
    appId: '1:36286736841:web:bdf7a28ddec5176d4c6018',
    measurementId: 'G-BMBTJG3PDH'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
