import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCIcCHEN7g9Bqmm5tNB4_0hgSvRzciX2UI",
  authDomain: "social-app-85efe.firebaseapp.com",
  databaseURL: "https://social-app-85efe.firebaseio.com",
  projectId: "social-app-85efe",
  storageBucket: "social-app-85efe.appspot.com",
  messagingSenderId: "700817176699",
  appId: "1:700817176699:web:5ebdb471e86d6429d34ade",
  measurementId: "G-RCKL3LE69Z"
};

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()


// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}