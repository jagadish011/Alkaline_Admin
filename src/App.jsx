import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import AdminCustomer from './pages/AllCustomer';
import CustomerDetail from './pages/CustomerDetails';
import AddCustomer from './pages/AddCustomer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EditCustomer from './pages/EditCustomer';
import CustomerBooking from './pages/CustomerBooking';
import AllBooking from './pages/AllBookings';
import BookingDatePage from './pages/BookingDatePage';
import { AuthProvider } from './context/AuthProvider';


function App() {
  return (
    <div className='h-full'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="" element={<Sidebar />}>
              <Route path='home' element={<Home/>}/>
              <Route path="allCustomer" element={<AdminCustomer />} />
              <Route path="/customerDetails/:id" element={<CustomerDetail />} />
              <Route path= "/addCustomer" element={<AddCustomer />} />
              <Route path= "/editCustomer/:id" element={<EditCustomer />} />
              <Route path= "/customerBooking/:id" element={<CustomerBooking />} />
              <Route path= "/allBookings" element={<AllBooking />} />
              <Route path='/bookings' element={<BookingDatePage/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
