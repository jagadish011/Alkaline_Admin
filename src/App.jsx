import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import AdminCustomer from './pages/AllCustomer';
import CustomerDetail from './pages/CustomerDetails';

function App() {
  return (
    <div className='h-full'>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Sidebar />}>
            <Route path="/allCustomer" element={<AdminCustomer />} />
            <Route path="/customerDetails/:id" element={<CustomerDetail />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
