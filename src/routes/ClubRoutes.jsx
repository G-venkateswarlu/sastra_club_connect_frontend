import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ClubLogin from "../pages/clubs/ClubLogin";
import ClubRegister from '../pages/clubs/ClubRegister';
import ClubHome from '../pages/clubs/ClubHome';

const ClubRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<ClubLogin/>} />
      <Route path="register" element={<ClubRegister/>} />
      <Route path="home" element={<ClubHome/> }/>

   </Routes>
  )
}

export default ClubRoutes