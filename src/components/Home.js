import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, Jumbotron, Button, Row, Col, Card } from 'react-bootstrap';
const API = "http://localhost:3000";

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
      <Container fluid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Classique</h1>
              <p>
                Enter email and password to log in.
              </p>
            </Jumbotron>
            <Form onSubmit={(event, props) => this.handleLogin(event, this.props)} >
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={this.handleChange} name="email" value={this.state.email} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} />
                </Form.Group>
    
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form><br/>
              <Card variant="light" >
                <Card.Header>New Here?</Card.Header>
                <Card.Body>
                  <footer >
                    <Link to ="/signup">Sign Up!</Link>
                  </footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    )
  }
}

export default Home;