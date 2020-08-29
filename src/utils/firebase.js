import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyAJz1ZBTFz6Px9Y_v2J0ytOLI8MZCA5XBc",
    authDomain: "a-comer-ya.firebaseapp.com",
    databaseURL: "https://a-comer-ya.firebaseio.com",
    projectId: "a-comer-ya",
    storageBucket: "a-comer-ya.appspot.com",
    messagingSenderId: "250316305452",
    appId: "1:250316305452:web:f3eb174e7e9e2f2e600d89"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
