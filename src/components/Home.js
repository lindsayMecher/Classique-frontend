import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import styled from "styled-components";
import black_background_medium from "../images/black_background_medium.png";
import { LOCALHOST_API, ENDPOINTS } from "../constants/api";

const Styles = styled.div`
  .container {
    margin-top: 5rem;
    // display: flex;
    // justify-content: center;
    // justify-content: center;
    // align-items: center;
    // min-height: 100vh;
  }

  // .content {
  //   width: 100%;
  //   max-width: 600px;
  //   padding: 2rem;
  //   text-align: center;
  //   border-radius: 8px;
  // }

  h4 {
    margin-top: 2rem;
  }

  button {
    text-align: center;
    margin-top: 2rem;
  }

  .form-label {
    text-align: left !important;
    display: block;
  }

  .headers {
    text-align: center;
    margin-top: 2rem;
  }

  a {
    color: #612da1;
  }

  a:hover {
    color: #612da1;
  }

  .btn {
    background-color: #612da1;
    color: #e0e0e0;

    &:hover {
      background-color: #e0e0e0;
      color: #612da1;
    }
  }
`;

function Home({ updateUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          navigate("/dashboard");
        })
        .catch((err) => alert(err));
    }
  }, [navigate, updateUser]);

  const handleLogin = (e) => {
    //  scrape form data and send it to the back end for authentication
    //  send a request to the backend with this email and password, back end will check if this is a valid email and password,
    //  if yes send the object back to front end and save in redux store, else send a message letting the user know it's incorrect credentials

    e.preventDefault();
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    fetch(`${LOCALHOST_API}${ENDPOINTS.AUTH}`, reqObj)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          updateUser(data);
          localStorage.setItem("token", data.token);
          // token is also expected from the backend, update localStorage to have this token.
          navigate("/dashboard");
        }
        //  check if user was authenticated on the back end. if yes, save that user to the store state
        // then redirect to /dashboard page.
        // if invalid credentials, display message to user.
      })
      .catch((err) => alert(err));
  };

  return (
    <Styles>
      <h1 className="headers">Classique</h1>
      <h3 className="headers">Enter email and password to log in.</h3>
      <div className="d-flex justify-content-center mt-5">
        <Card
          className="bg-dark text-white content"
          style={{ width: "30rem", textAlign: "center", minHeight: "30vh" }}
        >
          <Card.Img
            src={black_background_medium}
            style={{ minHeight: "30vh" }}
          />
          <Card.ImgOverlay>
            <div className="container">
              <Form onSubmit={handleLogin}>
                <Row className="mb-3">
                  <Col xs={12} md={1}></Col>
                  <Col xs={12} md={10}>
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
                  <Col xs={12} md={1}></Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={12} md={1}></Col>
                  <Col xs={12} md={10}>
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
                  <Col xs={12} md={1}></Col>
                </Row>
              </Form>
              <Button
                className="btn btn-secondary btn-lg fave-btn"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Card.ImgOverlay>
        </Card>
      </div>
      <h4 className="headers">
        <Link to="/signup">Sign Up!</Link>
      </h4>
      <h4 className="headers">
        <Link to="/about">About Classique</Link>
      </h4>
    </Styles>
  );
}

export default Home;
