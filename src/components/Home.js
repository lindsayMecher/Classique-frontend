import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import black_background_medium from '../images/black_background_medium.png';
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

const Styles = styled.div`
  .headers {
      text-align: center;
  }

  a {
    color: #612da1;
  }

  a:hover {
     color: #612da1;
  }

  .btn {
    background-color: #612da1;
    color: #e0e0e0;

    &:hover{
      background-color: #e0e0e0;
      color: #612da1;
    }
  }
    
`;

function Home({ updateUser, loggedUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };

      fetch(`${LOCALHOST_API}${ENDPOINTS.CURRENT_USER}`, reqObj)
        .then(resp => resp.json())
        .then(data => {
          updateUser(data);
          navigate('/dashboard');
        })
        .catch(err => console.log(err));
    }
  }, [navigate, updateUser]);


  const handleLogin = (e, props) => {
    //  scrape form data and send it to the back end for authentication
    //  send a request to the backend with this email and password, back end will check if this is a valid email and password,
    //  if yes send the object back to front end and save in redux store, else send a message letting the user know it's incorrect credentials

    e.preventDefault()
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password })
    };

    fetch(`${LOCALHOST_API}${ENDPOINTS.AUTH}`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          alert(data.error)
        } else {
          updateUser(data)
          localStorage.setItem('token', data.token)
          // token is also expected from the backend, update localStorage to have this token.
          navigate('/dashboard');
        }
        //  check if user was authenticated on the back end. if yes, save that user to the store state
        // then redirect to /dashboard page.
        // if invalid credentials, display message to user.
      })
      .catch(err => console.log(err))
  }

  return(
    <Styles>
      <div className="container-fluid">
        <Row>
          <Col>
            <br/>
            <br/>
            <br/>
            <Card className="bg-dark text-white" >
              <Card.Img src={black_background_medium} />
              <Card.ImgOverlay>
                  <h1 className="headers">Classique</h1>
                  <br/>
                  <h3 className="headers">Enter email and password to log in.</h3>
                  <br/>
                  <div className="container">
                  <Form onSubmit={(event, props) => handleLogin(event, props)} >

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password..." name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>

                    <br/>

                    <Button className="btn btn-secondary btn-lg fave-btn" type="submit" >
                      Submit
                    </Button>
                  </Form>
                  </div>
                </Card.ImgOverlay>
              </Card>
              <br/>
              <br/>
              <br/>
              <h4 className="headers"><Link to ="/signup">Sign Up!</Link></h4>
              <h4 className="headers"><Link to ="/about">About Classique</Link></h4>
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
          <br/>  
        </div>
      </Styles>
  )
}


export default Home;