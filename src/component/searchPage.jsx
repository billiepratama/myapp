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

class searchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers:[],
            nameSearch : "",
            activePage : 1,
            numberPage : 1
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searchName = this.searchName.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.deleteConfirm = this.deleteConfirm.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }
    nextPage() {
        if(this.state.activePage <= this.state.numberPage-1) {
            this.setState({activePage: ++this.state.activePage})
            this.searchName()
        } 
        else {
            alert("You have reached the end of page")
        }

    }
    prevPage() {
        if(this.state.activePage > 1) {
            this.setState({activePage: --this.state.activePage})
            this.searchName() 
        }
        else {
            alert("You have reached the end of page")
        }

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    editCustomer(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/editCustomer');
     }

    addCustomer() {
        this.props.history.push('/addCustomer');
    }

    componentDidMount() {
        var name = window.localStorage.getItem("name")
        this.setState({nameSearch:name})
        axios.get(BACKEND_URL + "?name=" + name + "&page=" + (this.state.activePage-1))
            .then(res => {
            this.setState({customers: res.data.content, numberPage:res.data.totalPages});
            })
            .catch(function (error) {
                console.log(error)
            })
        
    }

    searchName() {
        axios.get(BACKEND_URL + "?name=" + this.state.nameSearch + "&page=" + (this.state.activePage-1))
            .then(res => {
            this.setState({customers: res.data.content, numberPage:res.data.totalPages});
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    deleteCustomer(id) {
        axios.delete(BACKEND_URL + '/' + id)
        .then(res => {
            this.setState({customers: this.state.customers.filter(customer => customer.id !== id)});
        })
    }

    deleteConfirm(id){
        confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure want to delete this?',
        buttons: [
            {
            label: 'Yes',
            onClick: () => this.deleteCustomer(id)
            },
            {
            label: 'No'
            }
        ]
        })
    }
    
    render() {
        return (
            <div>
                <ul style={{color:"white"}}>.</ul>
                <span>    
                    <label>Name : </label>
                    <input type="text" name="nameSearch" className="name" value={this.state.nameSearch} onChange={this.onChange}/>
                    <label> </label>
                    <Button style={{background: '#000000'}}onClick={this.searchName}><label style={{color:'#FEE715FF'}}>Search</label></Button> 
                </span>
                <span><Button style={buttonStyle} className="addUser"  onClick={this.addCustomer}> <label style={{color: '#FEE715FF'}}>Add Customer</label></Button></span>              
                <button style={{background : '#FEE715FF'}} onClick={this.prevPage}> Prev  </button>
                <Button disabled><label style={{color: '#000000'}}>Page : {this.state.activePage}</label></Button>
                <button style={{background : '#FEE715FF'}} onClick={this.nextPage}> Next </button>
                <table style={{padding:40}} className="table table-striped">
                    <TableHead style={{background: '#FEE715FF'}}>
                        <TableRow>
                            <TableCell style={{width: '20px'}} align="center" className="hidden"> Id </TableCell>    
                            <TableCell style={{width: '180px'}} align="center"> Name </TableCell>
                            <TableCell style={{width: '60px'}} align="center"> CIF </TableCell>
                            <TableCell style={{width: '300px'}} align="center"> Address </TableCell>
                            <TableCell style={{width: '230px'}} align="center"> Email </TableCell>
                            <TableCell style={{width: '150px'}}align="center"> Phone Number </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        this.state.customers.map( customer =>
                            <TableRow key={customer.id}>
                                <TableCell component="th" scope="row"> {customer.id} </TableCell>
                                <TableCell align="center"> {customer.name} </TableCell>
                                <TableCell align="center"> {customer.cif} </TableCell>
                                <TableCell align="center"> {customer.address} </TableCell>
                                <TableCell align="center"> {customer.email} </TableCell>
                                <TableCell align="center"> {customer.phoneNumber} </TableCell>            
                                <TableCell align="center" onClick={() => this.editCustomer(customer.id)}> <CreateIcon /> </TableCell>
                                <TableCell align="center" onClick={() => this.deleteConfirm(customer.id)}> <DeleteIcon /> </TableCell>
                            </TableRow>
                        )
                    }
                    </TableBody>
                </table> 
       
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
export default searchPage;