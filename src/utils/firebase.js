import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBzdGz1BYTCIZyRpxUsu0GdCmR7_RpbYmo",
    authDomain: "acomerya-app.firebaseapp.com",
    databaseURL: "https://acomerya-app.firebaseio.com",
    projectId: "acomerya-app",
    storageBucket: "acomerya-app.appspot.com",
    messagingSenderId: "42823629619",
    appId: "1:42823629619:web:946d2b4bfd6ba1653d5c46"

};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()

