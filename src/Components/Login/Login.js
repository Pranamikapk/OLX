import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import Logo from '../../olx-logo.png';
import './Login.css';


function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [emailError,setEmailError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const navigate = useNavigate()

  const handleSignup = () =>{
    navigate('/signup')
  }

  const handleLogin = async(e) =>{
    e.preventDefault()
    setEmailError('')
    setPasswordError('')

    if(!email || !/\S+@\S+\.\S+/.test(email)){
      setEmailError('Please enter a valid email address')
      return
    }

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className={`input ${emailError ? 'error':''}`}
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)
              setEmailError('')
            }}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          {emailError && <span className="error">{emailError}</span>}
          <br/>
          <label htmlFor="password">Password</label>
          <br />
          <input
            className={`input ${passwordError ? 'error' : ''}`}
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)
              setPasswordError('')
            }}
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <br/>
          <button type='button' onClick={handleLogin} >Login</button>
        </form>
        <a onClick={handleSignup}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
