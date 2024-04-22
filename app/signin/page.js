"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-app";
import { FIREBASE_ERRORS } from "../../firebase/error";
import { AuthProvider } from "../../context/authProvider";

export default function SignIn() {
  const handleSignIn = (event) => {
    event.preventDefault();
    const signInEmail = document.getElementById('signInEmail').value;
    const signInPassword = document.getElementById('signInPassword').value;
    console.log(signInEmail, signInPassword);
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then((userCredential) => {
        // Signed in 
        console.log("sign in success")
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log("실패")
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        console.log(FIREBASE_ERRORS[errorMessage])
      });
  }

  const user = AuthProvider;
  console.log(user);
  return (
    <div>
      <form>
        <h4 className="title-sub">로그인</h4>
        <div> email : <input type="email" id="signInEmail" /></div>
        <div> password : <input type="password" id="signInPassword" /></div>
        <button type="submit" id="signInButton" onClick={handleSignIn}>로그인</button>
        <button onClick={(event) => { event.preventDefault(); window.location.href = "./signup"}}>회원가입 창으로 이동</button>
      </form>
    </div >
  )
}