import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Create from './Pages/Create'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context'
import Post from './store/postContext'

function App() {
  
    const {setUser} = useContext(AuthContext)
    const {firebase} = useContext(FirebaseContext)
    const auth = getAuth(firebase)

    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
        setUser(user)
      })
    })
  return (
    <div>
      <Post>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<ViewPost />} />
        </Routes>
      </BrowserRouter>
      </Post>
    </div>
  )
}

export default App