import React from 'react';
import { Container, Card, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
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
        background-color: #e0e0e0;
        color: #612da1;
      }
    }
`;


const Filter = (props) => {
    return(
        <>
        <Styles>
            <div className="headers">
                <Container>
                <Row>
                    <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Search By Voice Type</Card.Title>
                            <InputGroup className="mb-3">
                            <FormControl
                            as="select"
                            placeholder="Enter voice type..."
                            aria-label="searchVoiceType"
                            aria-describedby="searchBox"
                            name="searchTermVoiceType"
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
                            aria-label="search"
                            aria-describedby="searchBox"
                            name="searchTermCity"
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
                            aria-label="search"
                            aria-describedby="searchBox"
                            name="searchTermRepertoire"
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
                            <Button className="fave-btn" onClick={props.clearSearchTerms}>
                                Clear Search Criteria
                            </Button>
                        </Card>
                    </Col>
                </Row>
                </Container>
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