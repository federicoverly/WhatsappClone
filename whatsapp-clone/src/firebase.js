import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA6HlBnfExT2uBarD9-W7l7s4lssUmRgSI",
    authDomain: "whatsapp-clone-ed2e1.firebaseapp.com",
    projectId: "whatsapp-clone-ed2e1",
    storageBucket: "whatsapp-clone-ed2e1.appspot.com",
    messagingSenderId: "1070369412389",
    appId: "1:1070369412389:web:e84cfd4167f5e6b1ebb6cc"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

