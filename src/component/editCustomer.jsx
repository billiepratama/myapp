import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import BACKEND_URL from "../service/ApiService"

class editCustomer extends Component {

    constructor(props){
        super(props);
        this.state ={
            cif: "",
            name: "",
            address: "",
            email: "",
            phoneNumber: "",
            data:[]

        }
            this.backHome = this.backHome.bind(this);
            this.saveCustomer = this.saveCustomer.bind(this);
            this.loadCustomer = this.loadCustomer.bind(this);
            this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.loadCustomer();
    }

    loadCustomer() {        
        var userId = window.localStorage.getItem("userId")
        axios.get(BACKEND_URL + '/' + userId)
            .then(res => {
                this.setState({
                    name:res.data.name,
                    cif:res.data.cif,
                    address:res.data.address,
                    email:res.data.email,
                    phoneNumber:res.data.phoneNumber,         
                });
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    backHome()
    {
        this.props.history.push('/');
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    saveCustomer = (e) => {
        var userId = window.localStorage.getItem("userId")
        var name = this.state.name
        var CIF = this.state.cif
        var Address = this.state.address
        var Email = this.state.email
        var phoneNumber = this.state.phoneNumber
        
        e.preventDefault();
        name && CIF && Address && Email && phoneNumber ? ( 
        axios.put(BACKEND_URL + '/' + userId, {
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

    render() {
        return (
            <div>   
                <h2 className="text-center">Edit User</h2>
                <form>
                    <p><TextField type="text" placeholder="name" name="name" value={this.state.name} onChange={this.onChange}/></p>
                    <p><TextField type="text" placeholder="CIF" name="cif" value={this.state.cif} onChange={this.onChange}/></p>
                    <p><TextField type="text" placeholder="Address" name="address" value={this.state.address} onChange={this.onChange}/></p>
                    <p><TextField type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange}/></p>
                    <p><TextField type="text" placeholder="Phone Number" name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange}/></p>

                    <Button style={{background:'#FEE715FF'}} onClick={this.saveCustomer}>Save</Button>
                    <label style={{color:"white"}}> __ </label>
                    <Button style={{background:'#FEE715FF'}} onClick={this.backHome}>Back to Home</Button>
                </form>
            </div>
        );
    }
}

export default editCustomer;