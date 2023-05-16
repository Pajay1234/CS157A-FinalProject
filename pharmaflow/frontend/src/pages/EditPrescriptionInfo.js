import React from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

class EditPrescriptionInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerID: null,
            employeeID: null,
            pName: "",
            pID: null,
            pQuantity: null,
            pFrequency: ""
        };
    }

    async componentDidMount() {
        //get prescription info
        let body = {
            id: window.location.pathname.split("/")[2]
        }
        const res = await axios.post("http://localhost:5000/api/getCustomerPrescriptionInfo", {}, {params: body});
        let p = res.data.prescription

        this.setState({
            customerID: window.location.pathname.split("/")[2],
            employeeID: this.props.employeeID,
            pName: p.prescription_name,
            pID: p.prescription_id,
            pQuantity: p.prescription_quantity,
            pFrequency: p.prescription_frequency
        });
    }

    async handleSubmit() {
        let body = {
            cid: this.state.customerID,
            pid: this.state.pID,
            name: this.state.pName,
            quantity: this.state.pQuantity,
            frequency: this.state.pFrequency
        }
        const res = await axios.post("http://localhost:5000/api/changeCustomerPrescriptionInfo", {}, {params: body});
    }

    render() {
        return (
            <div style={{color:"#9544A2"}}>
                <h1>Edit John Smith's Prescription Information</h1>
                <h3>Customer email: johnsmith@gmail.com</h3>
                <div>
                    <span>
                        <p>Prescption ID: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={`${this.state.pID}`} onChange={async (event) => await this.setState({pID: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prescription Name: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={`${this.state.pName}`} onChange={async (event) => await this.setState({pName: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prescription Quantity: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={`${this.state.pQuantity}`} onChange={async (event) => await this.setState({pQuantity: event.target.value})}/></p> 
                    </span>
                </div>
                <div>
                    <span>
                        <p>Prescription Frequency: &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; <input placeholder={`${this.state.pFrequency}`} onChange={async (event) => await this.setState({pFrequency: event.target.value})}/></p> 
                    </span>
                </div>

                <button onClick ={async () => await this.handleSubmit()}>Save And Submit New Info</button>
                <button><Link to="/search-customer">Go Back To Customer Search</Link></button>
                <button><Link to="/employee-homepage">Go Back To Homepage</Link></button>
            </div>
        );
    }
}

export default EditPrescriptionInfo;