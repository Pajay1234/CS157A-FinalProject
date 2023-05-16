import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

class CustomerInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            custID: null,
            productNum: null,
            quantity: null
        };
    }

    async handleSubmit() {
        let body = {
            cid: this.state.custID,
            pNum: this.state.productNum,
            quantity: this.state.quantity
        };
        const res = await axios.post("http://localhost:5000/api/addInvoice", {}, {params: body}); 
    }

    render() {
        return (
            <div style={{color:"#EF984B"}}>
                <h1 style={{color:"#9544A2"}}>Add New Customer Invoice</h1>
                <div>
                    <span>
                        <p>Customer ID:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={`customer ID`} onChange={async (event) => await this.setState({custID: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prodcut Number:&ensp;&ensp;&ensp;&ensp; <input placeholder={`product number`} onChange={async (event) => await this.setState({productNum: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Quantity: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={`quantity`} onChange={async (event) => await this.setState({quantity: event.target.value})}/></p> 
                    </span>
                </div>

                <button onClick ={async () => await this.handleSubmit()}>Save And Submit Invoice</button>
                <button><Link to="/employee-homepage">Go Back To Homepage</Link></button>
            </div>
        );
    }
}

export default CustomerInvoice;