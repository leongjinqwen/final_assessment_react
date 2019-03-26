import React from 'react';
import { Button, UncontrolledAlert, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter,FormText } from 'reactstrap';
import axios from 'axios';

export default class ResetModal extends React.Component {
    state = {
        email: '',
        errors: [],
        success: [],
        hasErrors: false,
        isReset:false
    }

    handleEmail=(event)=> {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    handleReset=(event)=>{
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://photofy.herokuapp.com/api/v1/users/reset',
            data: { 
                email : this.state.email,
            }, 
        })
        .then(response => {
            console.log(response);
            setTimeout(this.props.toggle,1000);
            this.setState({
                isReset : true,
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

    render() {
        const {reset,toggle} = this.props
        const closeBtn = <button className="close" onClick={toggle}>&times;</button>;
        return (
        <>
            <Modal isOpen={reset} toggle={toggle}>
                <ModalHeader toggle={toggle} close={closeBtn}>Reset Password</ModalHeader>
                { this.state.isReset ? <UncontrolledAlert color="info">{this.state.success}</UncontrolledAlert> : null }                
                <ModalBody>
                    { this.state.hasErrors ? <UncontrolledAlert color="danger">{this.state.errors}</UncontrolledAlert> : null }
                    <FormGroup>
                        <FormText>We will send you an email with your new password. Remember to reset your password after login to your account.</FormText>
                        <Input type="email" name="email" onChange={this.handleEmail} placeholder="Email" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" block onClick={this.handleReset} >Send</Button>                  
                </ModalFooter>
            </Modal>
        </>
        );
    }
}