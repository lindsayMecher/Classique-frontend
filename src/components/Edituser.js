import React from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
const API = "http://localhost:3000";


const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
    }
    
`;


class Edituser extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      headshot: "",
      resume: "",
      degree: "",
      institution: "",
      website: "",
      voice_type: "",
      email: "",
      password: "",
      biography: ""
    }
  };

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
    };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  render(){
    return(
      <Styles>
        <Container>
          <br/>
          <br/> 
          <h1 className="headers" >Edit My Information</h1>
          <br/>
          <br/>
          <br/>
          <Form onSubmit={(event, props, userObj) => this.props.handleEdit(event, this.props, this.state)} className="edit-user">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} placeholder="Enter first name..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name} placeholder="Enter last name..." />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="degreeDropdown">
                <Form.Label>Highest Degree Earned</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} className="degree_dropdown" name="degree">
                <option value="GED">GED</option>
                <option value="High School Diploma">High School Diploma</option>
                <option value="Associate's">Associate's</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="Performance Certificate">Performance Certificate</option>
                <option value="PhD">PhD</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridInstitution">
                <Form.Label>Awarding Institution</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="institution" value={this.state.institution} placeholder="Enter Institution..." />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="voiceTypeDropdown">
                <Form.Label>Voice Type</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} className="voice_type_dropdown" name="voice_type" >
                  <option value="Soprano">Soprano</option>
                  <option value="Mezzo-Soprano">Mezzo-Soprano</option>
                  <option value="Contralto">Contralto</option>
                  <option value="Countertenor">Countertenor</option>
                  <option value="Tenor">Tenor</option>
                  <option value="Baritone">Baritone</option>
                  <option value="Bass-Baritone">Bass-Baritone</option>
                  <option value="Bass">Bass</option>
                  <option value="N/A">Not Applicable (N/A)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridWebsite">
                <Form.Label>Personal Website</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="website" value={this.state.website} placeholder="Enter Website..." />
              </Form.Group>
            </Form.Row>
              <Form.Group controlId="formGridBiography">
                <Form.Label>Biography</Form.Label>
                <Form.Control as="textarea" onChange={this.handleChange} name="biography" rows="8" value={this.state.biography} />
              </Form.Group>  
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={this.handleChange} name="email" value={this.state.email} placeholder="Enter email..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Enter password..." />
              </Form.Group>
            </Form.Row> 
            <br/>
            <br/> 
            <Button size="lg" block variant="dark" type="submit">
              Update
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

export default Edituser;
