import React from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

class SearchCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            res: []
        };
    }

    async handleClick() {
        ///send this.state.input
        let body = {
            input: this.state.input
        }
        const res = await axios.post("http://localhost:5000/api/searchCustomer", {}, {params: body}); 
        let x = res.data.customers ? res.data.customers : null;
        console.log(x);
        console.log(res.data);
        await this.setState({res: x});
    }

    render() {
        return (
            <div style={{color:"#9544A2"}}>
                <h1>Search for Customer</h1>

                <div>
                    <p>Enter query like this</p>
                    <p>identifier: value</p>
                    <p>Valid identifiers are id, name, and email. Click on a customer's <span style={{color:"#EF984B"}}>name</span> to edit their prescription information</p>
                    
                    <span style={{}}>
                        <input style={{width:900, borderWidth: 4, borderColor:"#EF984B"}} placeholder='ex. name: John Smith' onChange={async (event) => {await this.setState({input: event.target.value})}}></input>
                        <button style={{width:100, borderWidth: 4, borderColor:"#EF984B"}}onClick ={async () => await this.handleClick()}>Search</button>
                    </span>
                </div>

                <div>
                    { 
                        (this.state.res.length != 0) ? (
                            <ol>
                                {this.state.res.map((customer, index) => (
                                    <p key={index}>{customer.customer_id}  <Link style={{color:"#EF984B"}} to={`/edit-prescription-info/${customer.customer_id}`}>{customer.name}</Link>    {customer.email}   {customer.phone_number}</p>
                                ))}
                            </ol>
                        ) : (
                            <p></p>
                        )

                    }
                </div>
                <button><Link to="/employee-homepage">Go Back To Homepage</Link></button>
            </div>
        );
    }
}

export default SearchCustomer;


/*
<ol>
                                {this.state.res.map((cust, index) => {
                                    <li key={index}>{index}. {cust.name} <p>{cust.email}  {cust.id}</p></li>
                                })}
                            </ol>
*/