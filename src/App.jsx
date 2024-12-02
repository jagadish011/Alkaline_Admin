import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import AdminCustomer from './pages/AllCustomer';
import CustomerDetail from './pages/CustomerDetails';
import AddCustomer from './pages/AddCustomer';
import Home from './pages/Home';
import Profile from './components/Profile';
import EditCustomer from './pages/EditCustomer';
import CustomerBooking from './pages/CustomerBooking';
import AllBooking from './pages/AllBookings';
import BookingDatePage from './pages/BookingDatePage';
import { AuthProvider } from './context/AuthProvider';
import AllProducts from './pages/AllProducts';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProducts';
import AddAdmin from './pages/AddAdmin';
import AllAdmin from './pages/AllAdmin';

function App() {
  return (
    <div className='h-full'>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/" element={<Sidebar />}>
              <Route path="home" element={<Home />} />
              <Route path="allCustomer" element={<AdminCustomer />} />
              <Route path="customerDetails/:id" element={<CustomerDetail />} />
              <Route path="addAdmin" element={<AddAdmin/>}/>
              <Route path='allAdmins' element={<AllAdmin/>}/>
              <Route path="addCustomer" element={<AddCustomer />} />
              <Route path="editCustomer/:id" element={<EditCustomer />} />
              <Route path="customerBooking/:id" element={<CustomerBooking />} />
              <Route path="allBookings" element={<AllBooking />} />
              <Route path="bookings" element={<BookingDatePage />} />
              <Route path="allProducts" element={<AllProducts />} />
              <Route path="editProduct/:id" element={<EditProduct />} />
              <Route path='addProduct' element={<AddProduct />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
