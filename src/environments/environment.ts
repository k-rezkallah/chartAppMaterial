// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/charts/',
  initialDateRange: {
    from: '01/01/2013',
    to: '12/31/2022',
  },
  firebase: {
    projectId: 'chartappmaterial',
    appId: '1:5331044332:web:1fdef3d9353c6d0d40e2c9',
    storageBucket: 'chartappmaterial.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyAaVFP4QIaDkhzmDYTa96meu-NPBMT6yQ4',
    authDomain: 'chartappmaterial.firebaseapp.com',
    messagingSenderId: '5331044332',
    measurementId: 'G-6PFR2DCGJ4',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
