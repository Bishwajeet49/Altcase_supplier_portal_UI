import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout.jsx'



import SignIn from './components/auth/SignIn';
import Onboarding from './components/auth/Onboarding';

import Profile from './pages/Profile.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'

import DashboardHome from './pages/DashboardHome.jsx'
import ActiveDemands from './pages/ActiveDemands.jsx'
import MyQuotes from './pages/MyQuotes.jsx'
import PostAvailability from './pages/PostAvailability.jsx'
import SharesToBuy from './pages/SharesToBuy.jsx'

export default function Router() {
  return (
        <Routes>
            <Route path="/" element={<LandingPage />} />


            {/* this group will contain the routes relted to onboarding and sigin-in */}
            <Route path='auth' element={<AuthLayout />}>

                <Route
                  path='sign-in'
                  element={<SignIn />}
                />
                {/* <Route
                  path='onboarding'
                  element={<Onboarding />}
                /> */}
                {/* 				
                  <Route
                    path='forgot-password'
                    element={<ForgotPassword />}
                  /> */}

            </Route>

            {/* this will contain all the protacted routes related to the dashboard  */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>

              <Route path='dashboard' element={<DashboardHome />} />
              <Route path='demands' element={<ActiveDemands />} />
              <Route path='my-quotes' element={<MyQuotes />} />
              <Route path='availability' element={<PostAvailability />} />
              <Route path='shares-to-buy' element={<SharesToBuy />} />
              {/* <Route path='participants' element={<Participants />} /> */}
              <Route path='profile' element={<Profile />} />

              <Route path='events' >

                {/* <Route path='edit/:parentEventId/:subEventId' element={<EditEvent />} /> */}


              </Route>
               
               
                {/* Participant registration form for sub-events */}

            

            </Route>



        </Routes>
  )
}
