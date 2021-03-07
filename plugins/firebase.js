import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
        apiKey: "AIzaSyDHCvLczG3ypd5qKOEPU7N4nrP_umw4ERk",
        authDomain: "hack-u-app.firebaseapp.com",
        projectId: "hack-u-app",
        storageBucket: "hack-u-app.appspot.com",
        messagingSenderId: "1059239416489",
        appId: "1:1059239416489:web:56b3493032ace85b33cfb8",
        measurementId: "G-16PQT46C8D"    }
  )
}

export default firebase