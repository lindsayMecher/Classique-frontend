import React from 'react';
import { Jumbotron as Jumbo, Container, Card } from 'react-bootstrap';
import styled from 'styled-components';
import purple_thin from '../purple_thin.png';

const Styles = styled.div`
    .jumbo {
        background: url(${purple_thin}) no-repeat fixed bottom;
        background-size: cover;
        height: 20px;
        position: relative;
    }
  
`;

const Footer = () => (
    <Styles>
        
    </Styles>
);

export default Footer;

{/* <Jumbo fluid={false} className="jumbo">
            <img src="" alt="" />
        </Jumbo> */}