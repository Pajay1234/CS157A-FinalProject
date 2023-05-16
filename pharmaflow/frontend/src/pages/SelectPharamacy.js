import React from 'react';
import axios from 'axios';
import { Navigate }from 'react-router-dom';
import Dropdown from 'react-dropdown';

import './SelectPharmacy.css'

class SelectPharmacy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmacyNames: [],  //should be []
            selectedPharmacy: "",
            selectedPharmacyID: 0,
            msg: "",
            valid: false
        };
    }

    async handleClick() {
        if (this.state.selectedPharmacy) {
            let body = {
                name: this.state.selectedPharmacy
            };
            const res = await axios.post("http://localhost:5000/api/getSelectedPharmacyID", {}, {params: body});  
            console.log(res.data);
            let id = res.data.pharmacyID ? res.data.pharmacyID.pharmacy_id : null;
            if (!res) {
                await this.setState({msg: res.data.msg});
            }
            else {
                await this.props.setpid(id);
                await this.setState({selectedPharmacyID: id});
                await this.setState({valid: true});
            }
        }
        else {
            await this.setState({msg: "Select a  pharmacy first"});
        }
    }

    async componentDidMount() {
        const res = await axios.post("http://localhost:5000/api/getAllPharmacies", {}, {});  
        await this.setState({pharmacyNames: res.data});
    }
    
    render() {
        return (
            <div className = "page">
                <h1><span style={{color:"#EF984B"}}>Pharma</span><span style={{color:"#9544A2"}}>Flow</span></h1>
                <Dropdown className="dropdown" 
                          onChange={async (event) => await this.setState({selectedPharmacy: event.value})}  
                          options={this.state.pharmacyNames} 
                          value={"<  Click to select pharmacy  >"} 
                />
                <button onClick={async () => await this.handleClick()}>Select Pharmacy Location</button>
                <p>{this.state.msg}</p>
                {
                    (this.state.valid) ? (
                        <Navigate to={`/user-select/${this.state.selectedPharmacyID}`}/>
                    ) : (
                        <p></p>
                    )
                }
            </div>
        );
    }
}

export default SelectPharmacy;

