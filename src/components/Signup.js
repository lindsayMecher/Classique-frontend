import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";

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
      color: #e0e0e0;
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

function Signup({ handleSignup }) {
  const [honorific, setHonorific] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [voice_type, setVoiceType] = useState("Soprano");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pronouns, setPronouns] = useState("he, him, his");

  return (
    <Styles>
      <div className="container-fluid">
        <h1 className="headers main-header">Sign Up To Create An Account</h1>
        <Form
          onSubmit={(event) =>
            handleSignup(event, {
              honorific,
              first_name: firstName,
              last_name: lastName,
              voice_type,
              email,
              password,
              pronouns,
            })
          }
          className="signup"
        >
          <Row className="mb-3">
            <Col xs={12} md={2}>
              <Form.Group controlId="formHonorific">
                <Form.Label className="mb-1">Prefix/Honorific</Form.Label>
                <Form.Select
                  onChange={(e) => setHonorific(e.target.value)}
                  name="honorific"
                  className="w-100 form-control"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Mx.">Mx.</option>
                  <option value="Dr.">Dr.</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="formFirstName">
                <Form.Label className="mb-1">First Name</Form.Label>
                <Form.Control
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  name="first_name"
                  value={firstName}
                  placeholder="Enter first name..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={5}>
              <Form.Group controlId="formLastName">
                <Form.Label className="mb-1">Last Name</Form.Label>
                <Form.Control
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  name="last_name"
                  value={lastName}
                  placeholder="Enter last name..."
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
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
                  <option value="Contralto">Contralto</option>
                  <option value="Countertenor">Countertenor</option>
                  <option value="Tenor">Tenor</option>
                  <option value="Baritone">Baritone</option>
                  <option value="Bass-Baritone">Bass-Baritone</option>
                  <option value="Bass">Bass</option>
                  <option value="Not Applicable(N/A)">
                    Not Applicable(N/A)
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formPronouns">
                <Form.Label className="mb-1">Preferred Pronouns</Form.Label>
                <Form.Select
                  onChange={(e) => setPronouns(e.target.value)}
                  name="pronouns"
                  className="w-100 form-control"
                >
                  <option value="he, him, his">he, him, his</option>
                  <option value="she, her, hers">she, her, hers</option>
                  <option value="they, them, theirs">they, them, theirs</option>
                  <option value="ze, zir, zirs">ze, zir, zirs</option>
                  <option value="ze, hir, hirs">ze, hir, hirs</option>
                  <option value="he, him, his and they, them, theirs">
                    he, him, his and they, them, theirs
                  </option>
                  <option value="she, her, hers and they, them, theirs">
                    she, her, hers and they, them, theirs
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="mb-1">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email..."
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  value={email}
                  className="w-100"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="mb-1">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password..."
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="text-center">
            <Button type="submit" className="btn btn-secondary btn-lg fave-btn">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </Styles>
  );
}

export default Signup;
