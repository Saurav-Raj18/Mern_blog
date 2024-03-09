import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import Projects from './pages/Projects'
import FooterCmp from './components/FooterCmp'
const App = () => {
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/sign-up" element={<SignUp/>}/>
         <Route path="/sign-in" element={<SignIn/>}/>
         <Route path='/projects'element={<Projects/>}/>
        </Routes>
        <FooterCmp/>
    </BrowserRouter>
   
  )
}

export default App