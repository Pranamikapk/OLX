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

  const handleSubmit = async(e) =>{
    e.preventDefault()
    let isValid = true

    if(!/^[a-zA-Z]*$/.test(username)){
      setUserNameError('Username should contain letters only')
      isValid = false
    }else{
      setUserNameError('')
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email address is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError('Phone number should contain 10 digits');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (password.length < 6) {
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
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
