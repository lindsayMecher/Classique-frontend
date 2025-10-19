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

  .main-header {
    padding: 5rem;
  }
`;

function EditUser({ updateUser, handleEdit, loggedUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [website, setWebsite] = useState("");
  const [voiceType, setVoiceType] = useState("Soprano");
  const [biography, setBiography] = useState("");
  const [honorific, setHonorific] = useState("Mr.");
  const [pronouns, setPronouns] = useState("he, him, his");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (loggedUser) {
      setFirstName(loggedUser.first_name || "");
      setLastName(loggedUser.last_name || "");
      setDegree(loggedUser.degree || "");
      setInstitution(loggedUser.institution || "");
      setWebsite(loggedUser.website || "");
      setVoiceType(loggedUser.voice_type || "Soprano");
      setBiography(loggedUser.biography || "");
      setHonorific(loggedUser.honorific || "Mr.");
      setPronouns(loggedUser.pronouns || "he, him, his");
    }
  }, [loggedUser]);

  return (
    <Styles>
      <div className="headers">
        <h1 className="main-header">Edit My Information</h1>
        <Form
          onSubmit={(event) =>
            handleEdit(event, {
              first_name: firstName,
              last_name: lastName,
              degree,
              institution,
              website,
              voice_type: voiceType,
              biography,
              honorific,
              pronouns,
            })
          }
          className="edit-user"
        >
          <div className="container text-center">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formHonorific">
                  <Form.Label className="mb-1">Prefix/Honorific</Form.Label>
                  <Form.Select
                    onChange={(e) => setHonorific(e.target.value)}
                    name="honorific"
                    value={honorific}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mx.">Mx.</option>
                    <option value="Dr.">Dr.</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="d-flex">
                <Form.Group className="mb-3" controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="first_name"
                    value={firstName}
                    placeholder="Jane"
                  />
                </Form.Group>
              </Col>
              <Col className="d-flex">
                <Form.Group className="mb-3" controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="last_name"
                    value={lastName}
                    placeholder="Smith"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="degreeDropdown">
                  <Form.Label>Highest Degree Earned</Form.Label>
                  <Form.Select
                    onChange={(e) => setDegree(e.target.value)}
                    className="degree_dropdown"
                    name="degree"
                    value={degree}
                  >
                    <option value="GED">GED</option>
                    <option value="High School Diploma">
                      High School Diploma
                    </option>
                    <option value="Associate's">Associate&apos;s</option>
                    <option value="Bachelor's">Bachelor&apos;s</option>
                    <option value="Master's">Master&apos;s</option>
                    <option value="Performance Certificate">
                      Performance Certificate
                    </option>
                    <option value="PhD">PhD</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGridInstitution">
                  <Form.Label>Awarding Institution</Form.Label>
                  <Form.Control
                    onChange={(e) => setInstitution(e.target.value)}
                    type="text"
                    name="institution"
                    value={institution}
                    placeholder="Harvard University"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formPronouns">
                  <Form.Label>Preferred Pronouns</Form.Label>
                  <Form.Select
                    onChange={(e) => setPronouns(e.target.value)}
                    name="pronouns"
                    value={pronouns}
                  >
                    <option value="he, him, his">he, him, his</option>
                    <option value="she, her, hers">she, her, hers</option>
                    <option value="they, them, theirs">
                      they, them, theirs
                    </option>
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
              <Col>
                <Form.Group className="mb-3" controlId="voiceTypeDropdown">
                  <Form.Label>Voice Type</Form.Label>
                  <Form.Select
                    onChange={(e) => setVoiceType(e.target.value)}
                    className="voice_type_dropdown"
                    name="voice_type"
                    value={voiceType}
                  >
                    <option value="Soprano">Soprano</option>
                    <option value="Mezzo-Soprano">Mezzo-Soprano</option>
                    <option value="Contralto">Contralto</option>
                    <option value="Countertenor">Countertenor</option>
                    <option value="Tenor">Tenor</option>
                    <option value="Baritone">Baritone</option>
                    <option value="Bass-Baritone">Bass-Baritone</option>
                    <option value="Bass">Bass</option>
                    <option value="N/A">Not Applicable (N/A)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGridWebsite">
                  <Form.Label>Personal Website</Form.Label>
                  <Form.Control
                    onChange={(e) => setWebsite(e.target.value)}
                    type="text"
                    name="website"
                    value={website}
                    placeholder="mybeautifulwebsite.com"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formGridBiography">
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setBiography(e.target.value)}
                name="biography"
                rows="8"
                value={biography}
              />
            </Form.Group>
            <Button className="btn btn-secondary btn-lg fave-btn" type="submit">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Styles>
  );
}

export default EditUser;
