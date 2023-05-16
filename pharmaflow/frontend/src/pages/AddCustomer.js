import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            address: null,
            email: null,
            phoneNumber: null,
            dob: null,
            pid: null,
            pName: null,
            pQuan: null,
            pFreq: null
        };
    }

    async handleSubmit() {
        let body = {
            name: this.state.name,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            dob: this.state.dob,
            pid: this.state.pid,
            pName: this.state.pName,
            pQuan: this.state.pQuan,
            pFreq: this.state.pFreq
        }
        const res = await axios.post("http://localhost:5000/api/addCustomer", {}, {params: body}); 
    }

    render() {
        return (
            <div style={{color:"#9544A2"}}>
                <h1>Add New Customer</h1>
                <h2 style={{color:"#EF984B"}}>Personal Information</h2>
                <div>
                    <span>
                        <p>Name: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<input placeholder={"name"} onChange={async (event) => await this.setState({name: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Email: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"email"} onChange={async (event) => await this.setState({email: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Phone Number: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"xxx-xxxx"} onChange={async (event) => await this.setState({phoneNumber: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Address: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"address"} onChange={async (event) => await this.setState({address: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Date of Birth: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"yyyy-mm-dd"} onChange={async (event) => await this.setState({dob: event.target.value})}/></p> 
                    </span>
                </div>

                <h2 style={{color:"#EF984B"}}>Prescription Information</h2>
                <div>
                    <span>
                        <p>Prescription ID: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"prescription ID"} onChange={async (event) => await this.setState({pid: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prescription Name: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<input placeholder={"prescription name"} onChange={async (event) => await this.setState({pName: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prescription Quantity: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"prescription quantity"} onChange={async (event) => await this.setState({pQuan: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prescription Frequency: &ensp;&ensp;&ensp;&ensp; <input placeholder={"prescription frequency"} onChange={async (event) => await this.setState({pFreq: event.target.value})}/></p> 
                    </span>
                </div>

                <button onClick ={async () => await this.handleSubmit()}>Save And Submit New Customer</button>
                <button><Link to="/employee-homepage">Go Back To Homepage</Link></button>
            </div>
        );
    }
}

export default AddCustomer;