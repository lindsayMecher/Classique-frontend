import React from 'react';
import { Card, Container, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import black_mountain from '../black_mountain.png';
const googleOne = `https://www.google.com/maps/place/`;

class Post extends React.Component {

  renderFavoriteButton = () => {
    // if this post matches one of this users favorites, the button should say remove from favorites, else say add to favorites
    // if userFaves.length === 0
    // if there are no faves, render the add to faves button
    // if there are faves, check to see if the ID of this post matches one of the faves, in that case render remove from faves
    if (!this.props.included) {
        return <Button size="lg" block variant="success" onClick={(event, post) => this.props.addToFavorites(event, this.props.post)}>Add To Favorites</Button>
      } else {
        return <Button size="lg" block variant="dark" onClick={(event, post) => this.props.removeFromFavorites(event, this.props.post)}>Remove From Favorites</Button>
      }
    // ternary if true render Add to Faves if false render remove from faves
  }


  render(){

    const addressArray = this.props.post.street_address.split(' ')
    const mapped = addressArray.map((a) => `${a}+`).join('')
    const string = mapped.slice(0, mapped.length - 1);
    const addressLink = googleOne + string
    const totalLink = addressLink + `+` + this.props.post.city + `+` + this.props.post.state + `+` + this.props.post.zip

    return(
      <Row>
        <Col>
          <Card className="bg-dark text-white rounded" >
            <Card.Img src={black_mountain} />
            <Card.ImgOverlay>
              <h3>
                Seeking {this.props.post.voice_type} for {this.props.post.performance_type} on {this.props.post.stringified_date}
              </h3>
              <Card.Body>
              <h4>
              <strong>Repertoire: </strong>
              {this.props.post.repertoire}
              </h4>
              <h4>
              <strong>Venue Name: </strong>
              {this.props.post.venue_name}
              </h4>
              <h4>
              <strong>Address: </strong>  
              <Card.Link variant="light" href={totalLink} target="_blank" rel="noopener noreferrer" >
                {this.props.post.street_address}, {this.props.post.city}, {this.props.post.state} {this.props.post.zip}
              </Card.Link>
              </h4>
              <h4>
              <strong>Contact: </strong>  
              {this.props.post.contact_first_name} {this.props.post.contact_last_name} by email at 
              <Card.Link variant="light" href={`mailto:${this.props.post.contact_email}?Subject=Application to ${this.props.post.performance_type} Posting on Classical Singer Connection&body=Hello, my name is ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}. I am interested in the ${this.props.post.performance_type} opportunity you have posted on Classical Singer Connection. I am a ${this.props.loggedUser.voice_type}, and received my ${this.props.loggedUser.degree} from ${this.props.loggedUser.institution}. I have attached my resume for your review. Best, ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`} target="_top" rel="noopener noreferrer" >
              { ` ` + this.props.post.contact_email}
              </Card.Link>
              </h4>
              <h4>
                <strong>Last updated: </strong>
                {this.props.post.stringified_updated}
              </h4>
              </Card.Body>
             
             <Card.Body>
              {this.renderFavoriteButton()}
             </Card.Body>
             </Card.ImgOverlay>
          </Card>
          <br/>
          <br/>
        </Col>
      </Row>
    )
  }
}

export default Post;

// the post will an interpolated paragraph using the info the user posted. The info is detailed and can be filtered based on all criteria.  ie. voice type, date, city, etc.


{/* <div className="card">
        <div className="card-header">
          <h2>{this.props.post.voice_type} needed for {this.props.post.performance_type} on {this.props.post.stringified_date} at {this.props.post.stringified_time}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">Repertoire: {this.props.post.repertoire}</p>
          <p className="card-text">Venue Name: {this.props.post.venue_name}</p>
          <a href={totalLink} target="_blank" rel="noopener noreferrer">
            <p className="card-text">Address: {this.props.post.street_address}, {this.props.post.city}, {this.props.post.state} {this.props.post.zip}</p>
          </a>
          <p className="card-text">Contact: {this.props.post.contact_first_name} {this.props.post.contact_last_name} by email at {this.props.post.contact_email}</p>
          <p className="card-text">Additional Notes: {this.props.post.notes}</p>
          <p className="card-text">This is {this.props.post.paid === true ? "a paid" : "an unpaid"} opportunity.</p>
          <button className="btn btn-primary"><a href={`mailto:${this.props.post.contact_email}?Subject=Application to ${this.props.post.performance_type} Posting on Classical Singer Connection&body=Hello, my name is ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}. I am interested in the ${this.props.post.performance_type} opportunity you have posted on Classical Singer Connection. I am a ${this.props.loggedUser.voice_type}, and received my ${this.props.loggedUser.degree} from ${this.props.loggedUser.institution}. I have attached my resume for your review. Best, ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`} target="_top">Apply By Email</a></button>
          {this.renderFavoriteButton()}
        </div>
      </div> */}

//       <Card style={{ width: '18rem' }}>
//   <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
//   <Card.Body>
//     <Card.Title>Card Title</Card.Title>
//     <Card.Text>
//       Some quick example text to build on the card title and make up the bulk of
//       the card's content.
//     </Card.Text>
//   </Card.Body>
//   <ListGroup className="list-group-flush">
//     <ListGroupItem>Cras justo odio</ListGroupItem>
//     <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
//     <ListGroupItem>Vestibulum at eros</ListGroupItem>
//   </ListGroup>
//   <Card.Body>
//     <Card.Link href="#">Card Link</Card.Link>
//     <Card.Link href="#">Another Link</Card.Link>
//   </Card.Body>
// </Card>