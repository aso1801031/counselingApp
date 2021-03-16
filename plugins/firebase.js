import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
        apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    }
  )
}

export default firebase