import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [usernameError,setUserNameError] = useState('')
  const [emailError,setEmailError] = useState('')
  const [phoneError,setPhoneError] = useState('')
  const [passwordError,setPasswordError] = useState('')
  const {Firebase} = useContext(FirebaseContext)

  const handleLogin = () =>{
    navigate('/login')
  }


  const handleSubmit = async(e) =>{
    e.preventDefault()
    let isValid = true

    if(!username.trim()){
      setUserNameError('Enter a Username');
      isValid = false;
    }else if(!/^[a-zA-Z]*$/.test(username)){
      setUserNameError('Username should contain letters only')
      isValid = false
    }else{
      setUserNameError('')
    }

    if (!email.trim()) {
      setEmailError('Enter an Email address');
      isValid = false;
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid');
      isValid = false;
    } else {
      setEmailError('Enter an Email Address');
    }

    if (!phone.trim()) {
      setPhoneError('Enter a Phone Number');
      isValid = false;
    }else if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone number should contain 10 digits');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!password.trim()) {
      setPasswordError('Enter a Password');
      isValid = false;
    }else if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if(isValid){
      try {
        const authCred = await createUserWithEmailAndPassword(auth,email,password)
        const user = authCred.user

        await updateProfile(user, { displayName : username })
        const db = getFirestore(Firebase)
        await addDoc(collection(db,'users'),{
          uid: user.uid,
          username,
          email,
          phone
        }) 
        navigate('/login')
      } catch (error) {
        console.error('Error creating user:',error);
      }
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          {usernameError && <p className="error">{usernameError}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
           {emailError && <p className="error">{emailError}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          {phoneError && <p className="error">{phoneError}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
           {passwordError && <p className="error">{passwordError}</p>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
