import React from 'react';
import { Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem } from 'reactstrap';
import ShowModal from '../containers/ShowModal';
import { Link } from 'react-router-dom';
import SettingModal from '../containers/SettingModal';
import mainLogo from './camera.png';

export default class NavBar extends React.Component {
  state = {
    showModal: false,
    isOpen: false,
    edit: false,
  }
  
  open_toggle=()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggle=()=> {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  editModal=()=> {
    this.setState({
      edit: !this.state.edit,
      isOpen: false
    });
  }

  handleLogout = () => {
    localStorage.removeItem('me')
    // this.forceUpdate()
    this.setState({
      isOpen: false
    });
  }

  render() {
    return (
      <>
        {this.state.showModal ? <ShowModal showModal={this.state.showModal} toggle={this.toggle} /> : null}
        {this.state.edit ? <SettingModal edit={this.state.edit} editModal={this.editModal} /> : null}
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img src={mainLogo} width="35" height="35" className="d-inline-block align-top pr-1" alt="PHOTOFY" />PHOTOFY
          </NavbarBrand>
          <NavbarToggler onClick={this.open_toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { localStorage.getItem('me') ? 
              <>
                <NavItem>
                  <Link to="/" className="nav-link text-dark" onClick={this.editModal}>Setting</Link>
                </NavItem>
                <NavItem>
                  <Link to="/camera" className="nav-link text-dark" onClick={this.open_toggle}>Camera</Link>
                </NavItem>
                <NavItem>
                  <Link to="/" className="nav-link text-dark" onClick={this.handleLogout}>Logout</Link>
                </NavItem>
              </>
              :
              <>
                <NavItem>
                  <Link href="/" className="nav-link text-dark" onClick={this.toggle}>Login</Link>
                </NavItem>
              </> }
            </Nav>
          </Collapse>
        </Navbar>
      </>
    );
  }
}