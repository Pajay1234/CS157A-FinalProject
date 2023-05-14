import React from 'react';
import axios from 'axios';
import { Navigate }from 'react-router-dom';

class CustomerLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enteredID: "",
            enteredName: "",
            valid: false,
            msg: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        //authenticate)
        if (this.state.enteredID == "1234" && this.state.enteredName == "Joe") {
            await this.setState({valid: true});
            await this.props.setuid(this.state.enteredID);
        }
        else {
            await this.setState({msg: "Invalid login, try again"});
        }
    }

    render() {
        return (
            <div style={{color:"#EF984B"}}>
                <h1>Customer Login</h1>
                <h4 style={{color: "red"}}>{this.state.msg}</h4>
                <div>
                   <input placeholder="enter customer ID" onChange={async (event) => await this.setState({enteredID: event.target.value})}/>
                </div>
                <div>
                <input placeholder="enter name" onChange={async (event) => await this.setState({enteredName: event.target.value})}/>
                </div>
                <button onClick ={async () => await this.handleClick()}>Login</button>

                {
                    (this.state.valid) ? (
                        <Navigate to={`/customer-homepage`}/>
                    ) : (
                        <p></p>
                    )
                }
            </div>
        );
    }
}

export default CustomerLogin;