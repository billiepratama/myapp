import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import BACKEND_URL from "../service/ApiService";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' 
import TextField from '@material-ui/core/TextField';

class homePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers:[],
            nameSearch : "",
            activePage : 1,
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchName = this.searchName.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addCustomer() {
        this.props.history.push('/addCustomer');
    }
    
    searchName(name) {
        this.props.history.push('/searchPage');
        window.localStorage.setItem("name", name);
    }
    
    render() {
        return (
            <div>
                <ul style={{color:"white"}}>.</ul>
            
                    <label>Name : </label>
                    <input type="text" name="nameSearch" className="name" value={this.state.nameSearch} onChange={this.onChange}/>
                    <label> </label>
                    <Button style={{background: '#000000'}}onClick={() => this.searchName(this.state.nameSearch)}><label style={{color:'#FEE715FF'}}>Search</label></Button> 
                    <Button style={buttonStyle} className="addUser"  onClick={this.addCustomer}> <label style={{color: '#FEE715FF'}}>Add Customer</label></Button>       
             </div>
        );
    }

}
const buttonStyle = {
    left : 40,
    top : 30,
    background : '#000000', 
    display : 'flex',
}
export default homePage;