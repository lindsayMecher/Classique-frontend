import React, { useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #612da1;
  }

  a {
    color: #fff;
  }

  .nav-link-text {
    color: white;
  }

  .logo {
    font-family: Goudy Old Style;
  }

  a:hover {
    color: #612da1;
  }

  .logout-btn {
    color: white;

    &:hover {
      color: white;
    }
  }

  .navbar-brand,
  .navbar-nav,
  .nav-link {
    color: white;

    &:hover {
      color: white;
    }
  }
`;

function NavigationBar({ handleLogOut }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <Styles>
      <Navbar bg="green" variant="dark">
        <Navbar.Brand href="/" name="Classique">
          Classique
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          {localStorage.token ? (
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link
                  href="/dashboard"
                  name="dashboard"
                  id="dashboard-link"
                  style={{
                    color:
                      hoveredId === "dashboard-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("dashboard-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/my-posts"
                  name="My Posts"
                  id="myposts-link"
                  style={{
                    color: hoveredId === "myposts-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("myposts-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  My Posts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/edit-user"
                  name="Edit My Information"
                  id="edit-info-link"
                  style={{
                    color:
                      hoveredId === "edit-info-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("edit-info-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  Edit My Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/new-post"
                  name="New Post"
                  id="newpost-link"
                  style={{
                    color: hoveredId === "newpost-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("newpost-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  New Post
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/favorites"
                  name="View My Favorites"
                  id="favorites-link"
                  style={{
                    color:
                      hoveredId === "favorites-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("favorites-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  View My Favorites
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Button
                  className="logout-btn"
                  variant="link"
                  onClick={(event) => handleLogOut(event)}
                  name="Log Out"
                >
                  Log Out
                </Button>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav className="ml-auto">
              <Nav.Item>
                <Nav.Link
                  href="/"
                  id="login-link"
                  style={{
                    color: hoveredId === "login-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("login-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  Log In
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/signup"
                  id="signup-link"
                  style={{
                    color: hoveredId === "signup-link" ? "white" : "lightgrey",
                  }}
                  onMouseEnter={() => setHoveredId("signup-link")}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}

export default NavigationBar;
