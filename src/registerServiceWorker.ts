/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { print } from "@/common/mixins/func";
const debug = false;

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      print(debug,
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      print(debug, 'Service worker has been registered.')
    },
    cached() {
      print(debug, 'Content has been cached for offline use.')
    },
    updatefound() {
      print(debug, 'New content is downloading.')
    },
    updated() {
      print(debug, 'New content is available; please refresh.')
    },
    offline() {
      print(debug, 'No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
