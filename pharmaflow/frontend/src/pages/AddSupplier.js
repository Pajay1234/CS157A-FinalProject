import React from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

class AddSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            address: null,
            phoneNumber: null,
            email: null,
            website: null
        };
    }
    
    async handleSubmit() {
        const res = await axios.post("http://localhost:5000/api/addSupplier", {}, {params: this.state}); 
    }

    render() {
        return (
            <div style={{color:"#9544A2"}}>
                <h1>Add Supplier</h1>

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
                        <p>Phone Number: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"xxx-xxx-xxxx"} onChange={async (event) => await this.setState({phoneNumber: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Address: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={"address"} onChange={async (event) => await this.setState({address: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Website: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; &ensp; &ensp;  <input placeholder={"www.supplierName.com"} onChange={async (event) => await this.setState({name: event.target.value})}/></p> 
                    </span>
                </div>

                <button onClick ={async () => await this.handleSubmit()}>Save And Submit New Supplier</button>
                <button><Link to="/employee-homepage">Go Back To Homepage</Link></button>
            </div>
        );
    }
}

export default AddSupplier;