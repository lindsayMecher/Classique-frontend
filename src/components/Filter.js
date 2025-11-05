import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .headers {
    text-align: center;
    align: center;
  }

  .clear-card {
    margin-top: 5rem;
    margin-bottom: 5rem;
  }

  a {
    color: #fff;
  }

  a:hover {
    color: #612da1;
  }

  .fave-btn {
    background-color: #612da1;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

function Filter({
  clearSearchTerms,
  searchTermVoiceType,
  setSearchTermVoiceType,
  searchTermCity,
  setSearchTermCity,
  searchTermRepertoire,
  setSearchTermRepertoire,
}) {
  return (
    <>
      <Styles>
        <div className="headers">
          <div className="container px-0">
            <Row className="align-items-stretch">
              <Col className="d-flex">
                <Card className="flex-fill">
                  <Card.Body>
                    <Card.Title>Search By Voice Type</Card.Title>
                    <InputGroup className="mb-3 flex-fill">
                      <Form.Select
                        className="w-100 form-control"
                        placeholder="Enter voice type..."
                        name="searchTermVoiceType"
                        value={searchTermVoiceType}
                        onChange={(e) => setSearchTermVoiceType(e.target.value)}
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
                      </Form.Select>
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
                        type="text"
                        placeholder="Enter city..."
                        name="searchTermCity"
                        value={searchTermCity}
                        onChange={(e) => setSearchTermCity(e.target.value)}
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
                        type="text"
                        placeholder="Enter repertoire..."
                        name="searchTermRepertoire"
                        value={searchTermRepertoire}
                        onChange={(e) =>
                          setSearchTermRepertoire(e.target.value)
                        }
                      />
                    </InputGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="clear-card">
                  <Button
                    className="btn btn-secondary btn-lg fave-btn"
                    onClick={clearSearchTerms}
                  >
                    Clear Search Criteria
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Styles>
    </>
  );
}

export default Filter;
