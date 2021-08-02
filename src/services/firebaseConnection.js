import firebase from 'firebase/app';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyAnTGJtqbNASdPg6mc69hUli--bMxLbGN4",
  authDomain: "sistema-de-chamados-c12ad.firebaseapp.com",
  projectId: "sistema-de-chamados-c12ad",
  storageBucket: "sistema-de-chamados-c12ad.appspot.com",
  messagingSenderId: "708138376593",
  appId: "1:708138376593:web:2ebb5f64755f070c1e0e30",
  measurementId: "G-WTJ56HK6MR"
};

if(!firebase.apps.length){
  
  //Initialize Firebase
  firebase.initializeApp(firebaseConfig);

}

export default firebase;
