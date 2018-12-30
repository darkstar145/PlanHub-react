import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyChb9x2iXzwzfRR64auSHBIFr1_OGnAmpU',
  authDomain: 'fir-chat-e08df.firebaseapp.com',
  databaseURL: 'https://fir-chat-e08df.firebaseio.com',
  projectId: 'fir-chat-e08df',
  storageBucket: 'fir-chat-e08df.appspot.com',
  messagingSenderId: '91664651200'
}

export const fire = firebase.initializeApp(config)

const auth = fire.auth()
const db = fire.database()

export {
  auth,
  db
}
