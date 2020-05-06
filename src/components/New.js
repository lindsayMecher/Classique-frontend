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

class New extends React.Component {

  constructor(){
    super()
    this.state = {
      performance_type: "Concert",
      voice_type: "Soprano",
      date: "",
      time: "",
      venue_name: "",
      street_address: "",
      address_line_two: "",
      city: "",
      state: "",
      zip: "",
      repertoire: "",
      notes: "",
      user_honorific: "",
      contact_first_name: "",
      contact_last_name: "",
      contact_email: "",
      paid: true
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
          <h1 className="headers" >New Post</h1>
          <br/>
          <br/>
          <br/>
          <Form onSubmit={(event, props, postObj) => this.props.handleNewPost(event, this.props, this.state)}>
            <Form.Row>
              <Form.Group as={Col} controlId="opportunityDropdown">
                <Form.Label>Type of Opportunity</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="performance_type">
                  <option value="Concert">Concert</option>
                  <option value="Rehearsal">Rehearsal</option>
                  <option value="Master Class">Master Class</option>
                  <option value="Opera Role">Opera Role</option>
                  <option value="Musical Theatre Role">Musical Theatre Role</option>
                  <option value="Religious Service">Religious Service</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="voiceTypeDropdown">
                <Form.Label>Voice Type</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="voice_type">
                  <option value="Soprano">Soprano</option>
                  <option value="Mezzo-Soprano">Mezzo-Soprano</option>
                  <option value="Alto">Alto</option>
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
              <Form.Group as={Col} controlId="formGridDate">
                <Form.Label>Date</Form.Label>
                <Form.Control onChange={this.handleChange} type="date" name="date" value={this.state.date} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridTime">
                <Form.Label>Time</Form.Label>
                <Form.Control onChange={this.handleChange} type="time" name="time" value={this.state.time} />
              </Form.Group>
            </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridVenueName">
                  <Form.Label>Venue Name</Form.Label>
                  <Form.Control onChange={this.handleChange} type="text" name="venue_name" value={this.state.venue_name} placeholder="Enter venue name..." />
                </Form.Group>
              </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>Address Line One</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="street_address" value={this.state.street_address} placeholder="Enter street address..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAddress">
                <Form.Label>Address Line Two</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="address_line_two" value={this.state.street_address} placeholder="Enter apartment number...(optional)" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="city" value={this.state.city} placeholder="Enter city..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="state" value={this.state.state} placeholder="Enter state..." />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control onChange={this.handleChange} type="text" name="zip" value={this.state.zip} placeholder="Enter zip code..." />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridRepertoire">
              <Form.Label>Repertoire</Form.Label>
              <Form.Control as="textarea" onChange={this.handleChange} name="repertoire" rows="8" value={this.state.repertoire} placeholder="Enter repertoire..." />
            </Form.Group> 
            <Form.Group controlId="formGridNotes">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control as="textarea" onChange={this.handleChange} name="notes" rows="8" value={this.state.notes} placeholder="Enter notes like: 'Dress code is concert wear, knee-length dress, please arrive 15 minutes early, must have experience cantoring a Catholic mass, etc.' "/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Compensation</Form.Label>
              <div key={`default-checkbox`} className="mb-3">
              <Form.Check 
                type="radio"
                id={`paid`}
                label={`Paid`}
                onChange={this.handleChange}
                name="paid"
                value={true}
              />

              <Form.Check 
                type="radio"
                id={`unpaid`}
                label={`Unpaid`}
                onChange={this.handleChange}
                name="paid"
                value={false}
              />
            </div>
            </Form.Group>  
            <br/>
            <br/> 
            <Button className="fave-btn" size="lg" block variant="dark" type="submit">
              Post
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

export default New;
