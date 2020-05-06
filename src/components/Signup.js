import React from 'react';
import { Form, Container, Button, Col } from 'react-bootstrap';
import styled from 'styled-components';


const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
    }

    .fave-btn {
      background-color: #612da1;
      &:hover{
        background-color: black;
        color: #e0e0e0;
      }
    }
    
`;

class Signup extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      honorific: "Mr.",
      first_name: "",
      last_name: "",
      voice_type: "Soprano",
      email: "",
      password: "",
      pronouns: "he, him, his"
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
              <Form.Group as={Col} controlId="formHonorific">
                  <Form.Label>Prefix/Honorific</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="honorific">
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mx.">Mx.</option>
                    <option value="Dr.">Dr.</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} placeholder="Enter first name..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name} placeholder="Enter last name..." />
              </Form.Group>
              </Form.Row>
              <Form.Row>
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
                  <option value="Not Applicable(N/A)">Not Applicable(N/A)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formPronouns">
                  <Form.Label>Preferred Pronouns</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="pronouns">
                    <option value="he, him, his">he, him, his</option>
                    <option value="she, her, hers">she, her, hers</option>
                    <option value="they, them, theirs">they, them, theirs</option>
                    <option value="ze, zir, zirs">ze, zir, zirs</option>
                    <option value="ze, hir, hirs">ze, hir, hirs</option>
                    <option value="he, him, his and they, them, theirs">he, him, his and they, them, theirs</option>
                    <option value="she, her, hers and they, them, theirs">she, her, hers and they, them, theirs</option>
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
            <Button className="fave-btn" size="lg" block variant="dark" type="submit">
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