import React from 'react';
import { Button, UncontrolledAlert, FormGroup, Input, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import axios from 'axios';

export default class SettingModal extends React.Component {
    state = {
        username: '',
        password: '',
        errors: [],
        success: [],
        hasErrors: false,
        isEdit:false,
        isDelete:false,
        user:''
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.me)
        axios({
            method: 'get',
            url: 'https://photofy.herokuapp.com/api/v1/users/me',
            headers: { 
                Authorization: `Bearer ${user.auth_token}`
            },
        })
        .then(result => {
            this.setState({
              user : result.data,
            });
        })
        .catch(error => {
            console.log('ERROR: ', error)
        })
    }

    handleForm=(event)=> {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleEdit=(event)=>{
        event.preventDefault();
        const user = JSON.parse(localStorage.me)
        axios({
            method: 'post',
            url: `https://photofy.herokuapp.com/api/v1/users/edit/${user.user.id}`,
            data: { 
                password : this.state.password,
                username : this.state.username,
            }, 
            headers: { 
                Authorization: `Bearer ${user.auth_token}`
            },
        })
        .then(response => {
            console.log(response);
            setTimeout(this.props.editModal,1000);
            this.setState({
                isEdit : true,
                success : response.data.message,
            })
            
        })
        .catch(error => {
            this.setState({
                hasErrors : true,
                errors : error.response.data.message,
            })
        })
    }

    handleDelete=(event)=>{
        event.preventDefault();
        const user = JSON.parse(localStorage.me)
        axios({
            method: 'post',
            url: 'https://photofy.herokuapp.com/api/v1/users/delete', 
            headers: { 
                Authorization: `Bearer ${user.auth_token}`
            }, 
        })
        .then(response => {
            console.log(response);
            setTimeout(this.props.editModal,1000);
            this.setState({
                isDelete : true,
                success : response.data.message,
            })
            
        })
        .catch(error => {
            this.setState({
                hasErrors : true,
                errors : error.response.data.message,
            })
        })
        localStorage.removeItem('me')
        this.forceUpdate()
    }

    render() {
        const {user} = this.state
        const {edit,editModal} = this.props
        const closeBtn = <button className="close" onClick={editModal}>&times;</button>;
        return (
        <>
            <Modal isOpen={edit} toggle={editModal}>
                <ModalHeader toggle={editModal} close={closeBtn}>Setting</ModalHeader>
                { this.state.isEdit ? <UncontrolledAlert color="info">{this.state.success}</UncontrolledAlert> : null }                
                { this.state.isDelete ? <UncontrolledAlert color="info">{this.state.success}</UncontrolledAlert> : null }                                
                <ModalBody>
                    { this.state.hasErrors ? <UncontrolledAlert color="danger">{this.state.errors}</UncontrolledAlert> : null }
                    <FormGroup>
                        <Label for="username">New Username</Label>
                        <Input type="username" name="username" onChange={this.handleForm} defaultValue={user.username} placeholder="Username" />
                        <Label for="password">New Password</Label>
                        <Input type="password" name="password" onChange={this.handleForm} placeholder="Password" />
                        <Button style={{display:'block',width:'100%',margin:'5px 0'}} color="primary" onClick={this.handleEdit} >Edit</Button>                  
                    </FormGroup>
                    <FormGroup>
                        <Label for="delete">Want to delete your account?</Label>
                        <Button color="danger" onClick={this.handleDelete} style={{display:'block',width:'100%',margin:'5px 0'}}>Delete</Button>                  
                    </FormGroup>
                </ModalBody>
            </Modal>
        </>
        );
    }
}