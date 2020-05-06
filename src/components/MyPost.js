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
            <h1>Post!</h1>
        )
    }
}

export default MyPost;