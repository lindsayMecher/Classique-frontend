import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #612da1;
  }

  a {
    color: #FFF;
  }

  .logo{
    font-family: Goudy Old Style;
  }

  a:hover {
     color: #612da1;
  }

  .logout-btn {
    color: white;

    &:hover {
      color: white;
    }
  }

  .navbar-brand, .navbar-nav, .nav-link {
    color: white;

    &:hover {
      color: white;
    }
  }
  `;

const NavigationBar = (props) => (
  <Styles>
    <Navbar bg="green" variant="dark" >
      <Navbar.Brand href="/" >Classique</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse id="basic-navbar-nav" >
          {localStorage.token ?
            (
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/dashboard" >Dashboard</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/my-posts" >My Posts</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/edit-user" >Edit My Information</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/new-post" >New Post</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/favorites" >View My Favorites</Nav.Link></Nav.Item>
                <Nav.Item><Button className="logout-btn" variant="link" onClick={(event) => props.handleLogOut(event)}>Log Out</Button></Nav.Item>
              </Nav>
            )
            :
            (
              <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/">Log In</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/signup" >Sign Up</Nav.Link></Nav.Item>
              </Nav>
            )
          }
      </Navbar.Collapse>
    </Navbar>
  </Styles>
);

export default NavigationBar;