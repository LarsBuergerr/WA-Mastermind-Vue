/* eslint-disable no-console */

import { register } from 'register-service-worker';
import  Swal from 'sweetalert2';

Swal.fire();
// if (process.env.NODE_ENV === 'production') {
register(`${process.env.BASE_URL}service-worker.js`, {
  ready () {
    Swal.fire({
      title: 'App is Offline',
      text: 'You can use this app even without an internet connection.',
      icon: 'success',
    });
  },
  registered () {
    console.log('Service worker has been registered.')
  },
  cached () {
    console.log('Content has been cached for offline use.')
  },
  updatefound () {
    console.log('New content is downloading.')
  },
  updated () {
    console.log('New content is available; please refresh.')
  },
  offline () {
    Swal.fire({
      title: 'App is Offline',
      text: 'You can use this app even without an internet connection.',
      icon: 'success',
    });
  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
// }
