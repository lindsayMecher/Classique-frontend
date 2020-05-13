import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, Button, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import black_background_medium from '../images/black_background_medium.png';
const API = "http://localhost:3000";

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

class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount(){

    const token = localStorage.getItem('token')
    if (!token) {
      this.props.history.push('/')
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };
      fetch(`${API}/current_user`, reqObj)
        .then(resp => resp.json())
        .then(data => {
          this.props.updateUser(data)
        })
        .catch(err => console.log(err))
    }
  }


  handleLogin = (e, props) => {
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
      body: JSON.stringify(this.state)
    };

    fetch(`${API}/auth`, reqObj)
      .then(resp => resp.json())
      .then(data => {
        if (data.error){
          alert(data.error)
        } else {
          this.props.updateUser(data)
          localStorage.setItem('token', data.token)
          // token is also expected from the backend, update localStorage to have this token.
          this.props.history.push('/dashboard')
        }
        //  check if user was authenticated on the back end. if yes, save that user to the store state
        // then redirect to /dashboard page.
        // if invalid credentials, display message to user.
      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <Styles>
        <Container fluid>
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
                    <Container >
                    <Form onSubmit={(event, props) => this.handleLogin(event, this.props)} >

                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email..." onChange={this.handleChange} name="email" value={this.state.email} />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Enter password..." name="password" onChange={this.handleChange} value={this.state.password} />
                      </Form.Group>

                      <br/>

                      <Button block className="btn" variant="light" type="submit">
                        Submit
                      </Button>
                    </Form>
                    </Container>
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
          </Container>
        </Styles>
    )
  }
}

export default Home;