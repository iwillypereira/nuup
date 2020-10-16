/**
 * Firebase Login
 * Vuely comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

const config = {
    apiKey: "AIzaSyDS4u0f0jlbbsiNFB0zVOQSBwVusiM7wDA",
    authDomain: "tenedores-a1ad2.firebaseapp.com",
    databaseURL: "https://tenedores-a1ad2.firebaseio.com",
    projectId: "tenedores-a1ad2",
    storageBucket: "tenedores-a1ad2.appspot.com",
    messagingSenderId: "1019442605505",
    appId: "1:1019442605505:web:9031d7771ff428c8bb9340",
    measurementId: "G-02MNKCX64H"
};
// Initialize Firebase

export const firebaseApp = firebase.initializeApp(config);

// const auth = firebase.auth();
// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// const githubAuthProvider = new firebase.auth.GithubAuthProvider();
// const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
// const database = firebase.database();

// export {
//     auth,
//     googleAuthProvider,
//     githubAuthProvider,
//     facebookAuthProvider,
//     twitterAuthProvider,
//     database
// };
