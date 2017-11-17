import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyABcrFaNFIw_W89hXZiRbF_-UZJB7Cz4FA',
  authDomain: 'vuetodo-38d2e.firebaseapp.com',
  databaseURL: 'https://vuetodo-38d2e.firebaseio.com',
  projectId: 'vuetodo-38d2e',
  storageBucket: '',
  messagingSenderId: '434185844841'
}
export const app = firebase.initializeApp(config)
export const todosCollection = firebase.firestore().collection('todos')
