import React from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

export default class ShowModal extends React.Component {
    state = {
        signUp: false,
        reset:false
    }

    signup=()=> {
        this.setState({
            signUp: !this.state.signUp,
        });
    }


    render() {
        const { toggle,showModal } = this.props
        return (
            <>
                { this.state.signUp ? <SignupModal signup={this.signup} showModal={showModal} toggle={toggle} /> : <LoginModal signup={this.signup} showModal={showModal} toggle={toggle} /> }
            </>
        )
    }
}