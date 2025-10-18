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
      &:hover{
        background-color: black;
        color: #e0e0e0;
      }
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

  return(
    <Styles>
      <div className="container-fluid">
        <br/>
        <br/>
        <h1 className="headers" >Sign Up To Create An Account</h1>
        <br/>
        <br/>
        <br/>
        <Form onSubmit={(event) => handleSignup(event, { honorific, first_name: firstName, last_name: lastName, voice_type, email, password, pronouns })} className="signup">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formHonorific">
                <Form.Label>Prefix/Honorific</Form.Label>
                <Form.Select onChange={(e) => setHonorific(e.target.value)} name="honorific">
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Mx.">Mx.</option>
                  <option value="Dr.">Dr.</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={(e) => setFirstName(e.target.value)} type="text" name="first_name" value={firstName} placeholder="Enter first name..." />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" name="last_name" value={lastName} placeholder="Enter last name..." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="voiceTypeDropdown">
                <Form.Label>Voice Type</Form.Label>
                <Form.Select onChange={(e) => setVoiceType(e.target.value)} name="voice_type">
                  <option value="Soprano">Soprano</option>
                  <option value="Mezzo-Soprano">Mezzo-Soprano</option>
                  <option value="Contralto">Contralto</option>
                  <option value="Countertenor">Countertenor</option>
                  <option value="Tenor">Tenor</option>
                  <option value="Baritone">Baritone</option>
                  <option value="Bass-Baritone">Bass-Baritone</option>
                  <option value="Bass">Bass</option>
                  <option value="Not Applicable(N/A)">Not Applicable(N/A)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formPronouns">
                <Form.Label>Preferred Pronouns</Form.Label>
                <Form.Select onChange={(e) => setPronouns(e.target.value)} name="pronouns">
                  <option value="he, him, his">he, him, his</option>
                  <option value="she, her, hers">she, her, hers</option>
                  <option value="they, them, theirs">they, them, theirs</option>
                  <option value="ze, zir, zirs">ze, zir, zirs</option>
                  <option value="ze, hir, hirs">ze, hir, hirs</option>
                  <option value="he, him, his and they, them, theirs">he, him, his and they, them, theirs</option>
                  <option value="she, her, hers and they, them, theirs">she, her, hers and they, them, theirs</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email..." onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password..." name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </Form.Group>
            </Col>
          </Row>
          <br/>
          <br/>
          <Button className="btn btn-secondary btn-lg fave-btn" type="submit">
            Submit
          </Button>
        </Form>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </Styles>
  )
}

export default Signup;