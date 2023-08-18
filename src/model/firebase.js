
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {   apiKey: "AIzaSyDEj4AIxZwlAgXCt_zYPAhcsBYUCzlPryw",
authDomain: "pet-users-dd229.firebaseapp.com",
projectId: "pet-users-dd229",
storageBucket: "pet-users-dd229.appspot.com",
messagingSenderId: "81826238641",
appId: "1:81826238641:web:4b6b3598e1267255ee5290",
measurementId: "G-NY1V901SC5" };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  default auth ;