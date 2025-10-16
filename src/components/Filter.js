import React from 'react';
import { Card, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
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
        background-color: black;
        color: white;
      }
    }
`;


const Filter = (props) => {
    return(
        <>
        <Styles>
            <div className="headers">
                <div className="container">
                <Row>
                    <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Search By Voice Type</Card.Title>
                            <InputGroup className="mb-3">
                            <FormControl
                            as="select"
                            placeholder="Enter voice type..."
                            name="searchTermVoiceType"
                            value={props.searchTermVoiceType}
                            onChange={props.handleChange}
                            >
                                <option value="All">All</option>
                                <option value="Soprano">Soprano</option>
                                <option value="Mezzo-Soprano">Mezzo-Soprano</option>
                                <option value="Alto">Alto</option>
                                <option value="Contralto">Contralto</option>
                                <option value="Countertenor">Countertenor</option>
                                <option value="Tenor">Tenor</option>
                                <option value="Baritone">Baritone</option>
                                <option value="Bass-Baritone">Bass-Baritone</option>
                                <option value="Bass">Bass</option>
                            </FormControl>
                        </InputGroup>
                
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Search By City</Card.Title>
                            <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Enter city..."
                            name="searchTermCity"
                            value={props.searchTermCity}
                            onChange={props.handleChange}
                            />
                        </InputGroup>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Search By Repertoire</Card.Title>
                            <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Enter repertoire..."
                            name="searchTermRepertoire"
                            value={props.searchTermRepertoire}
                            onChange={props.handleChange}
                            />
                        </InputGroup>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col>
                        <Card>
                            <Button className="fave-btn" variant="dark" onClick={props.clearSearchTerms}>
                                Clear Search Criteria
                            </Button>
                        </Card>
                    </Col>
                </Row>
                </div>
            </div>
        </Styles>
        <br/>
        <br/>
        <br/>
        <br/>
        </>
    )
}

export default Filter;