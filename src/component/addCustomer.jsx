import React, { Component } from 'react'
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import BACKEND_URL from "../service/ApiService"
class addCustomer extends Component{

    constructor(props){
        super(props);
        this.state ={
            ID: "",
            CIF: "",
            name: "",
            Address: "",
            Email: "",
            phoneNumber: "",
            message: "",
            showPopup: true
        
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.backHome = this.backHome.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        this.setState({ showPopup: false });
    }
    addCustomer(e) {
        var name = this.state.name
        var CIF = this.state.CIF
        var Address = this.state.Address
        var Email = this.state.Email
        var phoneNumber = this.state.phoneNumber
        
        e.preventDefault();
        name && CIF && Address && Email && phoneNumber ? ( 
        axios.post(BACKEND_URL, {
            "cif": CIF,
            "name" : name,
            "address" : Address,
            "email" : Email,
            "phoneNumber": phoneNumber
        })
            .then(res => {
                this.props.history.push('/')
            })
            .catch(function (error) {
                console.log(error)
            })    
        )
        :alert('All data must be filled')
    }
    
    backHome(){
        this.props.history.push('/')
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return(
            <div className="addCustomer">
                <h1 className="text-center">Add User</h1>
                <p><TextField type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.onChange}/></p>
                <p><TextField type="text" placeholder="CIF" name="CIF" value={this.state.CIF} onChange={this.onChange}/></p>
                <p><TextField type="text" placeholder="Address" name="Address" value={this.state.Address} onChange={this.onChange}/></p>
                <p><TextField type="text" placeholder="Email" name="Email" value={this.state.Email} onChange={this.onChange}/></p>
                <p><TextField type="text" placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange}/></p>
                <Button style={{background:'#FEE715FF'}} onClick={this.addCustomer}>Add </Button>
                <label style={{color:"white"}}> __ </label>
                <Button style={{background:'#FEE715FF'}} onClick={this.backHome}> Back to Home</Button>
            </div>
        );
    }
}
const buttonStyle = {
    left : 600,
    top : 0,
    background : '#11111', 
    display : 'flex',
}
export default addCustomer;