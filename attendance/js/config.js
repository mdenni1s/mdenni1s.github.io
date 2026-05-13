const firebaseConfig = {
  apiKey: "AIzaSyDd0wlXV8BSPHSgt6tzt2jyLh-X7ugcNHg",
  authDomain: "attendance-4cfc6.firebaseapp.com",
  databaseURL: "https://attendance-4cfc6-default-rtdb.firebaseio.com",
  projectId: "attendance-4cfc6",
  storageBucket: "attendance-4cfc6.firebasestorage.app",
  messagingSenderId: "72369809441",
  appId: "1:72369809441:web:51fd9b61380d60233f9b60",
  measurementId: "G-54K2KVNJE9"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

console.log ('connected to firebase')

function logout(){
  //body...
  firebase.auth().signOut().then(function(){
    window.location.href = "index.html"
  }).catch((error) =>{
    alert ("Error while you try to logout")
  })
}