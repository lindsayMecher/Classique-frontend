import React from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
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
        color: white;
      }
    }
    
`;

class EditPost extends React.Component {

  constructor(){
    super()
    this.state = {
      postId: "",
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

  componentDidMount = () => {
      
      const post = this.props.post
      const user = this.props.loggedUser
      console.log(post.id)
      this.setState({
        postId: post.id,
        performance_type: post.performance_type,
        voice_type: post.voice_type,
        date: post.date,
        time: this.strfTime(),
        venue_name: post.venue_name,
        street_address: post.street_address,
        address_line_two: post.address_line_two,
        city: post.city,
        state: post.state,
        zip: post.zip,
        repertoire: post.repertoire,
        notes: post.notes,
        user_honorific: user.honorific,
        contact_first_name: user.first_name,
        contact_last_name: user.last_name,
        contact_email: user.email,
        paid: post.paid
      })
  }

  strfTime = () => {
      const t = this.props.post.time
        const time = t.split('T')
        const removeLast = time[1]
        const final = removeLast.substring(0, removeLast.length - 1)
        console.log(final)
        return final
  }

  handleChange = (e) => {
      console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <Styles>
        <Container>
          <Form onSubmit={(e, postObj) => this.props.editPost(e, this.state)}>
            <Form.Row>
              <Form.Group as={Col} controlId="opportunityDropdown">
                <Form.Label>Type of Opportunity</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="performance_type" value={this.state.performance_type}>
                  <option value="Concert">Concert</option>
                  <option value="Rehearsal">Rehearsal</option>
                  <option value="Master Class">Master Class</option>
                  <option value="Opera Role">Opera Role</option>
                  <option value="Musical Theatre Role">Musical Theatre Role</option>
                  <option value="Religious Service">Religious Service</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="voiceTypeDropdown" value={this.state.voice_type}>
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
                <Form.Control onChange={this.handleChange} type="text" name="address_line_two" value={this.state.address_line_two} placeholder="Enter apartment number...(optional)" />
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
            <Form.Group value={this.state.paid}>
              <Form.Label>Compensation</Form.Label>
              <div key={`default-checkbox`} className="mb-3">
              <Form.Check 
                type="radio"
                id={`paid`}
                label={`Paid`}
                checked={this.state.paid === true}
                onChange={this.handleChange}
                name="paid"
                value={true}
              />

              <Form.Check 
                type="radio"
                id={`unpaid`}
                label={`Unpaid`}
                checked={this.state.paid === false}
                onChange={this.handleChange}
                name="paid"
                value={false}
              />
            </div>
            </Form.Group>  
            <br/>
            <br/> 
            <Button className="fave-btn" size="lg" block variant="dark" type="submit">
              Update!
            </Button> 
          </Form>
          <br/>
        </Container>
      </Styles>
    )
  }
}

export default EditPost;