import React from 'react';
import {useState, use} from 'react';
import axios from 'axios';
import { Link }from 'react-router-dom';

class SearchInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productNumber: 0,
            res: []
        };
    }

    async handleClick() {
        let body = {
            pNum: this.state.productNumber
        };
        const res = await axios.post("http://localhost:5000/api/searchInventory", {}, {params: body}); 
        let x = res.data.products ? res.data.products : null;
        await this.setState({res: x});
    }

    render() {
        return (
            <div style={{color:"#9544A2"}}>
                <h1>Search Inventory</h1>

                <div>
                    <p>Enter Product Number</p>
                    
                    <span style={{}}>
                        <input style={{width:900, borderWidth: 4, borderColor:"#EF984B"}} placeholder='ex. 23' onChange={async (event) => {await this.setState({productNumber: event.target.value})}}></input>
                        <button style={{width:100, borderWidth: 4, borderColor:"#EF984B"}}onClick ={async () => await this.handleClick()}>Search</button>
                    </span>
                </div>

                <div>
                    { 
                        (this.state.res.length != 0) ? (
                            <ol>
                                {this.state.res.map((product, index) => (
                                    <p key={index}>{product.product_number}  &ensp;&ensp;&ensp; {product.name} &ensp;&ensp; {product.price} &ensp;&ensp; in stock: {product.quantity_in_stock}</p>
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

export default SearchInventory;