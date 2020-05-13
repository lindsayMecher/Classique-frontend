import React from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import styled from 'styled-components';
const API = "http://localhost:3000";


const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
    }

    .fave-btn {
      background-color: #612da1;
      &:hover{
        background-color: black;
        color: white;
      }
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
      degree: "GED",
      institution: "",
      website: "",
      voice_type: "Soprano",
      biography: "",
      honorific: "Mr.",
      pronouns: "he, him, his"
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
            this.populateForm()
          })
          .catch(err => console.log(err))
      }
    };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  populateForm = () => {
    const user = this.props.loggedUser
    console.log(user)
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      degree: user.degree,
      institution: user.institution,
      website: user.website,
      voice_type: user.voice_type,
      biography: user.biography,
      honorific: user.honorific,
      pronouns: user.pronouns
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
            <Form.Group as={Col} controlId="formHonorific">
              <Form.Label>Prefix/Honorific</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} name="honorific" value={this.state.honorific}>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mx.">Mx.</option>
                <option value="Dr.">Dr.</option>
              </Form.Control>
              </Form.Group>
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
                <Form.Control as="select" onChange={this.handleChange} className="degree_dropdown" name="degree" value={this.state.degree}>
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
            <Form.Group as={Col} controlId="formPronouns">
                  <Form.Label>Preferred Pronouns</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name="pronouns" value={this.state.pronouns}>
                    <option value="he, him, his">he, him, his</option>
                    <option value="she, her, hers">she, her, hers</option>
                    <option value="they, them, theirs">they, them, theirs</option>
                    <option value="ze, zir, zirs">ze, zir, zirs</option>
                    <option value="ze, hir, hirs">ze, hir, hirs</option>
                    <option value="he, him, his and they, them, theirs">he, him, his and they, them, theirs</option>
                    <option value="she, her, hers and they, them, theirs">she, her, hers and they, them, theirs</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="voiceTypeDropdown">
                <Form.Label>Voice Type</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} className="voice_type_dropdown" name="voice_type" value={this.state.voice_type} >
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
              <br/>
              <br/> 
              <Button className="fave-btn" size="lg" block variant="dark" type="submit">
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
