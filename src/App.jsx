import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import AdminCustomer from './pages/AllCustomer';
import CustomerDetail from './pages/CustomerDetails';
import AddCustomer from './pages/AddCustomer';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='h-full'>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Sidebar />}>
            <Route path='home' element={<Home/>}/>
            <Route path="/allCustomer" element={<AdminCustomer />} />
            <Route path="/customerDetails/:id" element={<CustomerDetail />} />
            <Route path= "/addCustomer" element={<AddCustomer />} />
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
