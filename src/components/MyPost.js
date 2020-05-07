import React from 'react';
import { Card, Container, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import black_background from '../black_background.png';
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

class MyPost extends React.Component {
    
    render(){
        console.log(this.props.post)
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
                    <strong>Last updated: </strong>
                    {this.props.post.stringified_updated}
                  </h5>
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

export default MyPost;