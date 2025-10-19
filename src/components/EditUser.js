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

  .edit-user .form-label {
    text-align: left;
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
              honorific,
              first_name: firstName,
              last_name: lastName,
              degree,
              institution,
              pronouns,
              voice_type: voiceType,
              website,
              biography,
            })
          }
          className="edit-user"
        >
          <Row className="mb-3">
            <Col xs={12} md={2}>
              <Form.Group controlId="formHonorific" className="flex-fill">
                <Form.Label className="mb-1">Prefix/Honorific</Form.Label>
                <Form.Select
                  value={honorific}
                  name="honorific"
                  onChange={(e) => setHonorific(e.target.value)}
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
              <Form.Group controlId="formGridFirstName">
                <Form.Label className="mb-1">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={firstName}
                  placeholder="Jane"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-100"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={5}>
              <Form.Group controlId="formGridLastName">
                <Form.Label className="mb-1">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={lastName}
                  placeholder="Smith"
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="degreeDropdown">
                <Form.Label className="mb-1">Highest Degree Earned</Form.Label>
                <Form.Select
                  value={degree}
                  name="degree"
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-100 form-control"
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

            <Col xs={12} md={8}>
              <Form.Group controlId="formGridInstitution">
                <Form.Label className="mb-1">Awarding Institution</Form.Label>
                <Form.Control
                  type="text"
                  name="institution"
                  value={institution}
                  placeholder="Harvard University"
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="formPronouns">
                <Form.Label className="mb-1">Preferred Pronouns</Form.Label>
                <Form.Select
                  value={pronouns}
                  name="pronouns"
                  onChange={(e) => setPronouns(e.target.value)}
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

            <Col xs={12} md={4}>
              <Form.Group controlId="voiceTypeDropdown">
                <Form.Label className="mb-1">Voice Type</Form.Label>
                <Form.Select
                  value={voiceType}
                  name="voice_type"
                  onChange={(e) => setVoiceType(e.target.value)}
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
                  <option value="N/A">Not Applicable (N/A)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formGridWebsite">
                <Form.Label className="mb-1">Personal Website</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  value={website}
                  placeholder="mybeautifulwebsite.com"
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-100"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formGridBiography" className="mb-3">
            <Form.Label className="mb-1">Biography</Form.Label>
            <Form.Control
              as="textarea"
              name="biography"
              value={biography}
              rows={8}
              onChange={(e) => setBiography(e.target.value)}
              className="w-100"
            />
          </Form.Group>
          <div className="text-center">
            <Button type="submit" className="btn btn-secondary btn-lg fave-btn">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </Styles>
  );
}

export default EditUser;
