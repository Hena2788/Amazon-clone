import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { DataContext } from '../../Component/DataProvider/DataProvider';
  import { Type } from "../../utils/action.type";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user)

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
     if (e.target.name == "signin") {
        signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
            console.log(userInfo);
            dispatch({
                type: Type.SET_USER,
                user: userInfo.user,
              });
        }).catch((err)=>{
            console.log(err);
        })
     }else{
        createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
            console.log(userInfo);
            dispatch({
                type: Type.SET_USER,
                user: userInfo.user,
              });
        }).catch((err)=>{
            console.log(err);
        })
     }
  }
  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className={classes.login_container}>
    <h1>Sign In</h1>
    <form action ="">
        <div>
            <label htmlFor='email'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
        </div>
        <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >Sign In</button>
    </form>
    <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login_registerButton}
        >Create your account</button>
      </div>
    </section>
  )
}

export default Auth