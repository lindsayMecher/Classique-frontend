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

const About = () => {
    return(
        <Styles>
            <h1 className="headers" >Welcome to Classique</h1>
        </Styles>
    )
};

export default About;