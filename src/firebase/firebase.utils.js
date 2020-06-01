import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBBOYGA5k3EiYr81Iz3HZG_UbZAfKunQjY',
  authDomain: 'crwn-db-f569e.firebaseapp.com',
  databaseURL: 'https://crwn-db-f569e.firebaseio.com',
  projectId: 'crwn-db-f569e',
  storageBucket: 'crwn-db-f569e.appspot.com',
  messagingSenderId: '701246047206',
  appId: '1:701246047206:web:a53e8c7d5e4c5b7deb4c27',
  measurementId: 'G-XGCT0KVVF7',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    }catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
