import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCuVHp0cRJNqmUD9YjShO9PJl-xWMrHKI",
  authDomain: "nurtureme123.firebaseapp.com",
  databaseURL: "https://nurtureme123-default-rtdb.firebaseio.com",
  projectId: "nurtureme123",
  storageBucket: "nurtureme123.firebasestorage.app",
  messagingSenderId: "199910184637",
  appId: "1:199910184637:web:ff926f0b17ab06aa2ec9d4",
  measurementId: "G-LH9FW7ZBPN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}
const signup = document.getElementById('SubmitSignup');
signup.addEventListener('click', async (event) => {
  event.preventDefault();

  const name = document.getElementById("name_sp").value;
  const number = document.getElementById("mobilenumber_sp").value;
  const email = document.getElementById("Email_sp").value;
  const password = document.getElementById("password2").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        name: name,
        number: number,
        email: email
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          window.location.href = 'index1.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
    })
});

const signIn = document.getElementById('SubmitSignin');

signIn.addEventListener('click', (event) => {
  event.preventDefault(); 
  const email = document.getElementById("siemail").value;
  const password = document.getElementById("sipassword").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid); // Fixed typo in localStorage
      window.location.href = '/index2/';
    })
    .catch((error) => {
      const errorCode = error.code; // Fixed typo in variable name
      if (errorCode === 'auth/invalid-credential') { // Corrected auth error type
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not exist', 'signInMessage');
      }
    });
});


//reset
const reset =document.getElementById("");
