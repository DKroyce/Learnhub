import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthPage from './components/AuthPage'
import HomePage from './components/HomePage'
import AdminHomePage from './components/AdminHomePage'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminEdit from './components/AdminEdit'
import AdminEditAdd from './components/AdminEditAdd'
import ViewCoursePage from './components/ViewCoursePage'
import EbookHorizontalCard from './components/EbookHorizontalCard'
function App() {[1]


  return (
    <>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/adminedit/:prodid" element={<AdminEdit />} />
          <Route path="/admineditadd" element={<AdminEditAdd />} />
           <Route path="/library" element={<EbookHorizontalCard />} />
               <Route path="/viewebook/:prodid" element={<ViewCoursePage />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
