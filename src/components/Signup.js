import React from 'react';
import { Form, Container, Jumbotron, Button, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import black_mountain from '../black_mountain.png';


const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
    }
    
`;

class Signup extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      voice_type: "",
      email: "",
      password: ""
    }
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
          <br/>
          <br/>
          <h1 className="headers" >Sign Up To Create An Account</h1>
          <br/>
          <br/>
          <br/>
          <Form onSubmit={(event, props, userObj) => this.props.handleSignup(event, this.props, this.state)} className="signup">
            <Form.Row>
              <Form.Group as={Col} controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} placeholder="Enter first name..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name} placeholder="Enter last name..." />
              </Form.Group>
              <Form.Group as={Col} controlId="voiceTypeDropdown">
                <Form.Label>Voice Type</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="voice_type">
                  <option value="Soprano">Soprano</option>
                  <option value="Mezzo-Soprano">Mezzo-Soprano</option>
                  <option value="Contralto">Contralto</option>
                  <option value="Countertenor">Countertenor</option>
                  <option value="Tenor">Tenor</option>
                  <option value="Baritone">Baritone</option>
                  <option value="Bass-Baritone">Bass-Baritone</option>
                  <option value="Bass">Bass</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email..." onChange={this.handleChange} name="email" value={this.state.email} />
              </Form.Group>
              <Form.Group as={Col} controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password..." name="password" onChange={this.handleChange} value={this.state.password} />
              </Form.Group>
            </Form.Row>
            <br/>
            <br/>
            <Button size="lg" block variant="dark" type="submit">
              Submit
            </Button>
          </Form>
          <br/>
          <br/>
          <br/>
          <br/>
        </Container>
       </Styles>
    )
  }
}

export default Signup;