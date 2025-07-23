import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google'
const App = () => {
  // const GoogleAuthWrapper = () =>{
  //   return  (
  //     <GoogleOAuthProvider clientId='400613191067-9uosd580n1spqrqqfin8r74pekvu2sdn.apps.googleusercontent.com'>
  //       <Login></Login>
  //     </GoogleOAuthProvider>
  //   )
  // }
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>} />
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
