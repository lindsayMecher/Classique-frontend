import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

const Styles = styled.div`
  .headers {
    text-align: center;
    align: center;
  }

  .fave-btn {
    background-color: #612da1;
    margin: 3rem;
    &:hover {
      background-color: black;
      color: white;
    }
  }

  .main-header {
    padding: 5rem;
  }

  .form-label {
    text-align: left !important;
    display: block;
  }
`;

function New({ updateUser, handleNewPost }) {
  const navigate = useNavigate();
  const [performanceType, setPerformanceType] = useState("Concert");
  const [voiceType, setVoiceType] = useState("Soprano");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [repertoire, setRepertoire] = useState("");
  const [notes, setNotes] = useState("");
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      const reqObj = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${LOCALHOST_API}${ENDPOINTS.CURRENT_USER}`, reqObj)
        .then((resp) => resp.json())
        .then((data) => {
          updateUser(data);
        })
        .catch((err) => alert(err));
    }
  }, [navigate]);

  // useEffect(() => {
  //   navigate("/my-posts");
  // }, [handleNewPost]);

  const togglePaid = (e) => {
    e.target.value === "true" ? setPaid(true) : setPaid(false);
  };

  return (
    <Styles>
      <div className="headers">
        <h1 className="main-header">New Post</h1>
        <Form
          onSubmit={(event) =>
            handleNewPost(event, {
              performanceType,
              voiceType,
              date,
              time,
              venueName,
              streetAddress,
              streetAddress2,
              city,
              state,
              zip,
              repertoire,
              notes,
              paid,
            })
          }
        >
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="opportunityDropdown">
                <Form.Label className="mb-1">Type of Opportunity</Form.Label>
                <Form.Select
                  onChange={(e) => setPerformanceType(e.target.value)}
                  name="performance_type"
                  className="w-100 form-control"
                >
                  <option value="Concert">Concert</option>
                  <option value="Rehearsal">Rehearsal</option>
                  <option value="Master Class">Master Class</option>
                  <option value="Opera Role">Opera Role</option>
                  <option value="Musical Theatre Role">
                    Musical Theatre Role
                  </option>
                  <option value="Religious Service">Religious Service</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="voiceTypeDropdown">
                <Form.Label className="mb-1">Voice Type</Form.Label>
                <Form.Select
                  onChange={(e) => setVoiceType(e.target.value)}
                  name="voice_type"
                  className="w-100 form-control"
                >
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
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={3}>
              <Form.Group controlId="formGridDate">
                <Form.Label className="mb-1">Date</Form.Label>
                <Form.Control
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="date"
                  value={date}
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="formGridTime">
                <Form.Label className="mb-1">Time</Form.Label>
                <Form.Control
                  onChange={(e) => setTime(e.target.value)}
                  type="time"
                  name="time"
                  value={time}
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formGridVenueName">
                <Form.Label className="mb-1">Venue Name</Form.Label>
                <Form.Control
                  onChange={(e) => setVenueName(e.target.value)}
                  type="text"
                  name="venue_name"
                  value={venueName}
                  placeholder="Enter venue name..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={5}>
              <Form.Group controlId="formGridAddress1">
                <Form.Label className="mb-1">Address Line One</Form.Label>
                <Form.Control
                  onChange={(e) => setStreetAddress(e.target.value)}
                  type="text"
                  name="street_address"
                  value={streetAddress}
                  placeholder="Enter street address..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="formGridAddress2">
                <Form.Label className="mb-1">Address Line Two</Form.Label>
                <Form.Control
                  onChange={(e) => setStreetAddress2(e.target.value)}
                  type="text"
                  name="address_line_two"
                  value={streetAddress2}
                  placeholder="Enter apartment number...(optional)"
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group controlId="formGridZip">
                <Form.Label className="mb-1">Zip Code</Form.Label>
                <Form.Control
                  onChange={(e) => setZip(e.target.value)}
                  type="text"
                  name="zip"
                  value={zip}
                  placeholder="Enter zip code..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={5}>
              <Form.Group controlId="formGridCity">
                <Form.Label className="mb-1">City</Form.Label>
                <Form.Control
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  name="city"
                  value={city}
                  placeholder="Enter city..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="formGridState">
                <Form.Label className="mb-1">State</Form.Label>
                <Form.Control
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  name="state"
                  value={state}
                  placeholder="Enter state..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={2}>
              <Form.Group>
                <Form.Label className="mb-1">Compensation</Form.Label>
                <div className="mb-3">
                  <Form.Check
                    type="radio"
                    id={"paid"}
                    label={"Paid"}
                    checked={paid === true}
                    onChange={togglePaid}
                    name="paid"
                    value="true"
                  />
                  <Form.Check
                    type="radio"
                    id={"unpaid"}
                    label={"Unpaid"}
                    checked={paid === false}
                    onChange={togglePaid}
                    name="paid"
                    value="false"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={12}>
              <Form.Group controlId="formGridRepertoire">
                <Form.Label className="mb-1">Repertoire</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => setRepertoire(e.target.value)}
                  name="repertoire"
                  rows="8"
                  value={repertoire}
                  placeholder="Enter repertoire..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={12}>
              <Form.Group controlId="formGridNotes">
                <Form.Label className="mb-1">Additional Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={(e) => setNotes(e.target.value)}
                  name="notes"
                  rows="8"
                  value={notes}
                  className="w-100"
                  placeholder="Enter notes like: 'Dress code is concert wear, knee-length dress, please arrive 15 minutes early, must have experience cantoring a Catholic mass, etc.' "
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className="btn btn-secondary btn-lg fave-btn" type="submit">
            Post
          </Button>
        </Form>
      </div>
    </Styles>
  );
}

export default New;
