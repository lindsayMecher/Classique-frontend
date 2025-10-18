import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

const Styles = styled.div`
  .headers {
    text-align: center;
    align: center;
  }

  .fave-btn {
    background-color: #612da1;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

function EditPost({ post, editPost, loggedUser, updateUser }) {
  const navigate = useNavigate();
  const [postId, setPostId] = useState("");
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
  const [paid, setPaid] = useState([]);

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
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedUser) {
      setPostId(post.id || "");
      setPerformanceType(post.performance_type || "Concert");
      setVoiceType(post.voice_type || "Soprano");
      setDate(post.date || "");
      setTime(strfTime() || "");
      setVenueName(post.venue_name || "");
      setStreetAddress(post.street_address || "");
      setStreetAddress2(post.address_line_two || "");
      setCity(post.city || "");
      setState(post.state || "");
      setZip(post.zip || "");
      setRepertoire(post.repertoire || "");
      setNotes(post.notes || "");
      setPaid(post.paid || []);
    }
  }, [loggedUser, post]);

  const strfTime = () => {
    const time = post.time.split("T");
    const removeLast = time[1];
    const final = removeLast.substring(0, removeLast.length - 1);
    return final;
  };

  const togglePaid = (e) => {
    e.target.value === "true" ? setPaid(true) : setPaid(false);
  };

  return (
    <Styles>
      <div className="container">
        <Form
          onSubmit={(e) =>
            editPost(e, {
              postId,
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
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="opportunityDropdown">
                <Form.Label>Type of Opportunity</Form.Label>
                <Form.Select
                  onChange={(e) => setPerformanceType(e.target.value)}
                  name="performance_type"
                  value={performanceType}
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
            <Col>
              <Form.Group className="mb-3" controlId="voiceTypeDropdown">
                <Form.Label>Voice Type</Form.Label>
                <Form.Select
                  onChange={(e) => setVoiceType(e.target.value)}
                  name="voice_type"
                  value={voiceType}
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
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGridDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  name="date"
                  value={date}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formGridTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  onChange={(e) => setTime(e.target.value)}
                  type="time"
                  name="time"
                  value={time}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGridVenueName">
                <Form.Label>Venue Name</Form.Label>
                <Form.Control
                  onChange={(e) => setVenueName(e.target.value)}
                  type="text"
                  name="venue_name"
                  value={venueName}
                  placeholder="Enter venue name..."
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address Line One</Form.Label>
                <Form.Control
                  onChange={(e) => setStreetAddress(e.target.value)}
                  type="text"
                  name="street_address"
                  value={streetAddress}
                  placeholder="Enter street address..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address Line Two</Form.Label>
                <Form.Control
                  onChange={(e) => setStreetAddress2(e.target.value)}
                  type="text"
                  name="address_line_two"
                  value={streetAddress2}
                  placeholder="Enter apartment number...(optional)"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  name="city"
                  value={city}
                  placeholder="Enter city..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  onChange={(e) => setState(e.target.value)}
                  type="text"
                  name="state"
                  value={state}
                  placeholder="Enter state..."
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formGridZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  onChange={(e) => setZip(e.target.value)}
                  type="text"
                  name="zip"
                  value={zip}
                  placeholder="Enter zip code..."
                />
              </Form.Group>
            </Col>
          </Row>
          <Col>
            <Form.Group controlId="formGridRepertoire">
              <Form.Label>Repertoire</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setRepertoire(e.target.value)}
                name="repertoire"
                rows="8"
                value={repertoire}
                placeholder="Enter repertoire..."
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formGridNotes">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setNotes(e.target.value)}
                name="notes"
                rows="8"
                value={notes}
                placeholder="Enter notes like: 'Dress code is concert wear, knee-length dress, please arrive 15 minutes early, must have experience cantoring a Catholic mass, etc.' "
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group value={paid}>
              <Form.Label>Compensation</Form.Label>
              <div key={"default-checkbox"} className="mb-3">
                <Form.Check
                  type="radio"
                  id={"paid"}
                  label={"Paid"}
                  checked={paid}
                  onChange={togglePaid}
                  name="paid"
                  value="true"
                />

                <Form.Check
                  type="radio"
                  id={"unpaid"}
                  label={"Unpaid"}
                  checked={paid}
                  onChange={togglePaid}
                  name="paid"
                  value="false"
                />
              </div>
            </Form.Group>
          </Col>
          <br />
          <br />
          <Button className="btn btn-secondary btn-lg fave-btn" type="submit">
            Update!
          </Button>
        </Form>
        <br />
      </div>
    </Styles>
  );
}

export default EditPost;
