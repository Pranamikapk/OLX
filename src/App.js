import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Create from './Components/Create/Create'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Home from './Pages/Home'
import ViewPost from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/Context'
import Post from './store/postContext'

function App() {
    const {user,setUser} = useContext(AuthContext)
    const {firebase} = useContext(FirebaseContext)
    const auth = getAuth(firebase)
   
    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
        setUser(user)
      })
    },[setUser])

  return (
    <div>
      {/* <button onClick={()=>setUser('user')}>Click</button> */}
      <Post>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={user ? <Navigate to='/'/>:<Signup />} />
          <Route path="/login" element={user ? <Navigate to='/'/>:<Login />} />
          <Route path="/create" element={user ? <Create /> : <Navigate to="/login"/> } />
          <Route path="/view" element={user ? <ViewPost /> : <Navigate to="/login"/> } />
        </Routes>
      </BrowserRouter>
      </Post>
    </div>
  )
}

export default App