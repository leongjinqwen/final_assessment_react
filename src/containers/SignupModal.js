import React from 'react';
import { Button, UncontrolledAlert, FormGroup, FormText, Input, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form } from 'reactstrap';
import axios from 'axios';

export default class SignupModal extends React.Component {
    state = {
        username: '',
        email: '',
        password: '',
        userValid: false,
        emailValid: false,
        passwordValid: false,
        formValid: false,
        hasErrors: false,
        errors: [],
        isLogin: false,
        success: []
    }
    
    handleInput=(event)=> {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value },
            () => {this.validField(name,value)});
    }

    handleSignup=(event)=> {
        event.preventDefault();

        axios({
            method: 'post',
            url: 'https://photofy.herokuapp.com/api/v1/users/new',
            data: { 
                username: this.state.username,
                email : this.state.email,
                password: this.state.password
            }
        })
        .then(response => {
            // debugger
            console.log(response);
            localStorage.setItem('me', JSON.stringify(response.data));
            setTimeout(this.props.toggle,1000);;
            this.setState({
                isLogin : true,
                success : response.data.message,
            })
        })
        .catch(error => {
            // debugger
            this.setState({
                hasErrors : true,
                errors : error.response.data.message,
            })
        })
    }

    validField(fieldName,value) {
        let userValid = this.state.userValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'username':
            userValid = value.length >= 3;
            break;
            case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            break;
            case 'password':
            passwordValid = value.length >= 8;
            break;
            default:
            break;
        }
        this.setState({ userValid: userValid,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                        }, this.validForm);
    }

    validForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.userValid});
    }
    
    render() {
        const {signup,showModal,toggle} = this.props
        const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
        return (
        <>
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Sign Up for Photofy</ModalHeader>
                { this.state.isLogin ? <UncontrolledAlert color="info">{this.state.success}</UncontrolledAlert> : null }                
                <ModalBody>
                    <Form onSubmit={this.handleSignup}>
                    <FormGroup>
                    { this.state.hasErrors ? <UncontrolledAlert color="danger">{this.state.errors}</UncontrolledAlert> : null }
                        <Input type="name" name="username" onChange={this.handleInput} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="email" onChange={this.handleInput} placeholder="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" onChange={this.handleInput} placeholder="Password" />
                    </FormGroup>
                    { !this.state.formValid ? <small className='text-muted'>* All fields are required</small> : null}
                    <Button color="primary" block disabled={!this.state.formValid} onClick={this.handleSignup} >Sign Up</Button>
                    <FormText color="muted">By tapping Sign Up, you agree to our Terms of Service and Privacy Policy</FormText>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Label for="exampleEmail">Already sign up? Login now!</Label>
                    <Button color="secondary" onClick={signup}>Login</Button>
                </ModalFooter>
            </Modal>
        </>
        );
    }
}