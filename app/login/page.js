"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app, auth, db } from "./../../firebase/firebase-app";

export default function Login() {
  const handleSignUp = () => {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("login success")
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log("ERROR - ", error.code, " - ", error.message);
        console.log("apikey - ", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div>
      <h4 className="title-sub">회원가입</h4>
      <div> email : <input type="email" /></div>
      <div> password : <input type="password" /></div>
      <button type="submit" id="signUpButton" onClick={handleSignUp}>회원가입</button>
      <button>로그인</button>
    </div>
  )
}