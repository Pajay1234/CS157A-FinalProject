import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState} from 'react';
import React from 'react';

import SelectPharmacy from './pages/SelectPharamacy';
import UserSelect from './pages/UserSelect';
//import SelectPharmacyLocation from './pages/SelectPharmacyLocation';
import CustomerLogin from './pages/CustomerLogin';
import CustomerHomepage from './pages/CustomerHomepage';
import EmployeeHomepage from './pages/EmployeeHomepage';
import EmployeeLogin from './pages/EmployeeLogin';
import CustomerUpdateInfo from './pages/CustomerUpdateInfo';
import CustomerPrescriptionInfo from './pages/CustomerPrescriptionInfo';
import SearchCustomer from './pages/SearchCustomer';
import ShowCustomerInfo from './pages/ShowCustomerInfo';
import SearchInventory from './pages/SearchInventory';
import AddSupplier from './pages/AddSupplier';
import AddCustomer from './pages/AddCustomer';
import PlaceOrder from './pages/PlaceOrder';
import EditPrescriptionInfo from './pages/EditPrescriptionInfo';
import CustomerInvoice from './pages/CustomerInvoice';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: 1
    }
    this.setUid = this.setUid.bind(this);
    this.setPid = this.setPid.bind(this);
  }

  async setUid(newID) {
    await localStorage.setItem('uid', newID);
    await this.setState({dummy: this.state.dummy*-1});
  }

  async setPid(newID) {
    await localStorage.setItem('pid', newID);
    await this.setState({dummy: this.state.dummy*-1});
  }

  render() {
    return (
      <div className="App">
      <div>
       {/* <h3>{localStorage.getItem('uid')}</h3>*/}
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/select-pharmacy"/>}/>
              <Route path="/select-pharmacy" element={<SelectPharmacy setpid={this.setPid}/>}/>
              {/*<Route path="/select-pharmacy-location/:pharmacyName" element={<SelectPharmacyLocation/>}/>*/}
              <Route path="/user-select/:pharmacyName" element={<UserSelect/>}/>
              <Route path="/customer-login" element={<CustomerLogin setuid={this.setUid}/>}/>
              <Route path="/employee-login" element={<EmployeeLogin setuid={this.setUid}/>}/>
              <Route path="/customer-homepage/" element={<CustomerHomepage customerID={localStorage.getItem('uid')} setuid={this.setUid}/>}/>
              <Route path="/employee-homepage/" element={<EmployeeHomepage employeeID={localStorage.getItem('uid')} setuid={this.setUid}/>}/>
              <Route path="/customer-update-info" element={<CustomerUpdateInfo customerID={localStorage.getItem('uid')}/>}/>
              <Route path="/customer-prescription-info" element={<CustomerPrescriptionInfo customerID={localStorage.getItem('uid')}/>}/>
              <Route path="/search-customer" element={<SearchCustomer/>}/>
              <Route path="/show-customer-info" element={<ShowCustomerInfo/>}/>
              <Route path="/search-inventory" element={<SearchInventory/>}/>
              <Route path="/add-supplier" element={<AddSupplier/>}/>
              <Route path="/add-customer" element={<AddCustomer/>}/>
              <Route path="/place-order" element={<PlaceOrder/>}/>
              <Route path="/customer-invoice" element={<CustomerInvoice/>}/>
              <Route path="/edit-prescription-info/:customerID" element={<EditPrescriptionInfo employeeID ={localStorage.getItem('uid')}/>}/>
            </Routes>
          </BrowserRouter>
        
        </div>
          <div >
            <p className = "footer"><span style={{color:"#EF984B"}}>Pharma</span><span style={{color:"#9544A2"}}>Flow</span></p>
          </div>
      </div>
    );
  }
}

export default App;
