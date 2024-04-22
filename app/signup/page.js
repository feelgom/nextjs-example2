"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-app";
import { FIREBASE_ERRORS } from "../../firebase/error";
import { AuthProvider } from "../../context/authProvider";

export default function SignUp() {
  const handleSignUp = (event) => {
    event.preventDefault();
    const signUpEmail = document.getElementById('signUpEmail').value;
    const signUpPassword = document.getElementById('signUpPassword').value;
    console.log(signUpEmail, signUpPassword);
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        // Signed in 
        console.log("sign up success")
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(FIREBASE_ERRORS[errorMessage])
        // ..
      });
  }

  const user = AuthProvider;
  console.log(user);
  return (
    <div>
      <form>
        <h4 className="title-sub">회원가입</h4>
        <div> email : <input type="email" id="signUpEmail" /></div>
        <div> password : <input type="password" id="signUpPassword" /></div>
        <button type="submit" id="signUpButton" onClick={handleSignUp}>회원가입</button>
        <button onClick={(event) => { event.preventDefault(); window.location.href = "./signin" }}>로그인 창으로 이동</button>
      </form>
    </div >
  )
}