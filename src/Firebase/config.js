import firebase from 'firebase'

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyD8Qsp3889wdBLIaKC9H7vjeLCmSXRQHf4",
    authDomain: "myauth-f620d.firebaseapp.com",
    projectId: "myauth-f620d",
    storageBucket: "myauth-f620d.appspot.com",
    messagingSenderId: "780954994106",
    appId: "1:780954994106:web:c53f600333b8f209eec983",
    measurementId: "G-0C53T51LCP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080');
// }


export { auth, db };
export default firebase;
