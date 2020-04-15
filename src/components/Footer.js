import React from 'react';
import { Jumbotron as Jumbo, Container, Card } from 'react-bootstrap';
import styled from 'styled-components';
import music_notes from '../music_notes.png';

const Styles = styled.div`
    .jumbo {
        background: url(${music_notes}) no-repeat fixed bottom;
        background-size: cover;
        height: 100px;
        position: relative;
        z-index: -2;
        

    }
    .overlay {
        background-color: black;
        opacity: 0.8;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

const Footer = () => (
    <Styles>
        <Jumbo fluid={true} className="jumbo">
            <div className="overlay">
            </div>
            <Container>
                <img src="" alt="" />
            </Container>
        </Jumbo>
    </Styles>
);

export default Footer;