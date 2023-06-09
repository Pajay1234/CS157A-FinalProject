import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

function EmployeeHomepage(props) {
    return (
        <div style={{color:"#9544A2"}}>
            <h1>Homepage</h1>
            <h4><Link style={{color:"#EF984B"}} to="/search-customer">Search Customers</Link></h4>
            <h4><Link style={{color:"#EF984B"}} to="/add-customer">Add New Customer</Link></h4>
            <h4><Link style={{color:"#EF984B"}} to="/search-inventory">Search Inventory</Link></h4>
            <h4><Link style={{color:"#EF984B"}} to="/customer-invoice">New Customer Invoice</Link></h4>
            <h4><Link style={{color:"#EF984B"}} to="/add-supplier">Add Supplier</Link></h4>
            <h4><Link style={{color:"#EF984B"}} to="/place-order">Place Order</Link></h4>
            <button onClick={async () => await props.setuid(null)}><Link to="/">Logout</Link></button>
        </div>
    );
}

export default EmployeeHomepage;