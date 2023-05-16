import React from 'react';
import axios from 'axios';
import { Navigate }from 'react-router-dom';

class EmployeeLogin extends React.Component {
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
        //authenticate
        let body = {
            eid: this.state.enteredID,
            name: this.state.enteredName,
            pid: localStorage.getItem('pid')
        };
        const res = await axios.post("http://localhost:5000/api/authEmployee", {}, {params: body}); 
        if (res.data.pass) {
            await this.setState({valid: true});
            await this.props.setuid(this.state.enteredID);
        }
        else {
            await this.setState({msg: "invalid login, try again"});
        }
    }

    render() {
        return (
            <div style={{color:"#9544A2"}}>
                <h1>Employee Login</h1>
                <h4 style={{color: "red"}}>{this.state.msg}</h4>
                <div>
                   <input placeholder="enter employee ID" onChange={async (event) => await this.setState({enteredID: event.target.value})}/>
                </div>
                <div>
                <input placeholder="enter name" onChange={async (event) => await this.setState({enteredName: event.target.value})}/>
                </div>
                <button onClick ={async () => await this.handleClick()}>Login</button>

                {
                    (this.state.valid) ? (
                        <Navigate to={`/employee-homepage`}/>
                    ) : (
                        <p></p>
                    )
                }
            </div>
        );
    }
}

export default EmployeeLogin;