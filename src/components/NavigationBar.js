import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: black;
  }

  .navbar-brand, .navbar-nav, .nav-link {
    color: white;

    &:hover {
      color: white;
    }
  }
  `;

const NavigationBar = (props) => (
  
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/" >Classique</Navbar.Brand>
      <Navbar.Toggle aria-contents="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" >
          {localStorage.token ?
            (
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/dashboard" >Dashboard</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/edit-user" >Edit My Information</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/new-post" >New Post</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/favorites" >View My Favorites</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/logout" >Log Out</Nav.Link></Nav.Item>
              </Nav>
            )
            :
            (
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Log In</Nav.Link></Nav.Item>
                <Nav.Item><Button variant="link" onClick={(event) => props.handleLogOut(event)}>Log Out</Button></Nav.Item>
              </Nav>
            )
          }
      </Navbar.Collapse>
    </Navbar>
  
);

export default NavigationBar;