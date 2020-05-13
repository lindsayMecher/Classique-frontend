import React from 'react';
import EditPost from './EditPost';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import black_background from '../images/black_background.png';
import styled from 'styled-components';
const googleOne = `https://www.google.com/maps/place/`;



const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
    }

    .image{
      opacity: 0.9
    }

    a {
      color: #FFF;
    }

    a:hover {
       color: #612da1;
    }

    .fave-btn {
      background-color: #612da1;
      &:hover{
        background-color: #e0e0e0;
        color: #612da1;
      }
    }

    .remove-btn {
      background-color: #e0e0e0;
      &:hover{
        background-color: #612da1;
        color: #e0e0e0;
      }
    }
    
`;


class Post extends React.Component {

  constructor(){
    super()
    this.state = {
      showEditForm: false
    }
  }

  renderFavoriteButton = () => {
    // if this post matches one of this users favorites, the button should say remove from favorites, else say add to favorites
    // if userFaves.length === 0
    // if there are no faves, render the add to faves button
    // if there are faves, check to see if the ID of this post matches one of the faves, in that case render remove from faves
    if (!this.props.included) {
        return <Button className="fave-btn" size="lg" block variant="dark" onClick={(event, post) => this.props.addToFavorites(event, this.props.post)}>Add To Favorites</Button>
      } else {
        return <Button className="remove-btn" size="lg" block variant="light" onClick={(event, post) => this.props.removeFromFavorites(event, this.props.post)}>Remove From Favorites</Button>
      }
    // ternary if true render Add to Faves if false render remove from faves
  }

  emailLink = () => {
    const post = this.props.post
    const user = this.props.loggedUser
    if (!user.degree && !user.institution) {
      return `mailto:${post.contact_email}?Subject=Application to ${post.performance_type} Posting on Classique&body=Hello ${post.user_honorific} ${post.contact_last_name},%0d%0d My name is ${user.first_name} ${user.last_name}. I am a ${user.voice_type}, and I am interested in the ${post.performance_type} opportunity you have posted on Classique. Please let me know if you would like me to send any references.%0d%0d Best,%0d%0d${user.first_name} ${user.last_name}%0d%0d Preferred pronouns: ${user.pronouns}.`
    }
    return `mailto:${post.contact_email}?Subject=Application to ${post.performance_type} Posting on Classique&body=Hello ${post.user_honorific} ${post.contact_last_name},%0d%0d My name is ${user.first_name} ${user.last_name}. I am interested in the ${post.performance_type} opportunity you have posted on Classique. I am a ${user.voice_type}, and received my ${user.degree} from ${user.institution}. Please let me know if you would like me to send any references.%0d%0d Best,%0d%0d${user.first_name} ${user.last_name}%0d%0d Preferred pronouns: ${user.pronouns}.`
  } 

  openEmail = () => {
    window.open(this.emailLink(), '_blank');
  }

  toggleModal = () => {
    console.log("display edit")
    this.setState({
      showEditForm: !this.state.showEditForm
    })
  }

  render(){

    const addressArray = this.props.post.street_address.split(' ')
    const mapped = addressArray.map((a) => `${a}+`).join('')
    const string = mapped.slice(0, mapped.length - 1);
    const addressLink = googleOne + string
    const totalLink = addressLink + `+` + this.props.post.city + `+` + this.props.post.state + `+` + this.props.post.zip

    return(
      <Styles>
      <Row>
        <Col>
          <Card className="bg-dark text-white rounded" >
            <Card.Img className="image" src={black_background} />
            <Card.ImgOverlay className="image">
              <h3>
                Seeking {this.props.post.voice_type} for {this.props.post.performance_type} on {this.props.post.stringified_date}
              </h3>
              <Card.Body>
              <h5>
              <strong>Repertoire: </strong>
              {this.props.post.repertoire}
              </h5>
              <h5>
              <strong>Venue Name: </strong>
              {this.props.post.venue_name}
              </h5>
              <h5>
              <strong>Address: </strong>  
              <Card.Link variant="light" color="white" href={totalLink} target="_blank" rel="noopener noreferrer" >
                {this.props.post.street_address}, {this.props.post.city}, {this.props.post.state} {this.props.post.zip}
              </Card.Link>
              </h5>
              <h5>
                <strong>Notes: </strong>
                { this.props.post.notes }
              </h5>
              <h5>
                <strong>Paid: </strong>
                { this.props.post.paid ? "Yes" : "No" }
              </h5>
              </Card.Body>
             
             <Card.Body>
              {(this.props.post.user_id !== this.props.loggedUser.id) ? 
              <Container>
                <Row>
                  <Col>
                    <Button className="fave-btn" size="lg" block variant="dark" onClick={this.openEmail}>
                      Apply By Email
                    </Button>
                  </Col>
                  <Col>
                    {this.renderFavoriteButton()}
                  </Col>
                </Row>
              </Container>
            :
            (
              <>
              <Container>
                <Row>
                <Col>
                <Button onClick={this.toggleModal} className="fave-btn" size="lg" block variant="dark" >
                  Edit Post
                </Button>
               </Col>
               <Col>
                <Button onClick={(e, postId) => this.props.deletePost(e, this.props.post.id)} className="fave-btn" size="lg" block variant="dark">
                  Delete Post
                </Button>
                </Col>
                </Row>
                <Modal show={this.state.showEditForm} onHide={this.toggleModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Editing Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <EditPost loggedUser={this.props.loggedUser} post={this.props.post} editPost={this.props.editPost}/>

                  </Modal.Body>
                  <Modal.Footer>
                  <Container>
                    <Row>
                      <Col>
                    <Button onClick={this.toggleModal} className="fave-btn" size="md" block variant="dark" >
                      Close
                    </Button>
                    </Col>
                   
                    </Row>
                    </Container>
                  </Modal.Footer>
                </Modal>
              </Container>
              </>
            )
            }
             </Card.Body>
             </Card.ImgOverlay>
          </Card>
          <br/>
          <br/>
        </Col>
      </Row>
      </Styles>
    )
  }
}

export default Post;

              // <h5>
              // <strong>Contact: </strong>  
              // {this.props.post.user_honorific} {this.props.post.contact_first_name} {this.props.post.contact_last_name} by email at 
              // <Card.Link variant="light" href={this.emailLink()} target="_top" rel="noopener noreferrer" >
              // { ` ` + this.props.post.contact_email}
              // </Card.Link>
              // </h5>