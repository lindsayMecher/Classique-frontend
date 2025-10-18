import React, { useState } from "react";
import EditPost from "./EditPost";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import black_background from "../images/black_background.png";
import styled from "styled-components";
const googleOne = "https://www.google.com/maps/place/";

const Styles = styled.div`
  .headers {
    text-align: center;
    align: center;
  }

  .image {
    opacity: 0.9;
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
      background-color: #e0e0e0;
      color: #612da1;
    }
  }

  .remove-btn {
    background-color: #e0e0e0;
    &:hover {
      background-color: #612da1;
      color: #e0e0e0;
    }
  }
`;

function Post({
  included,
  addToFavorites,
  removeFromFavorites,
  post,
  loggedUser,
  deletePost,
  editPost,
}) {
  const [showEditForm, setShowEditForm] = useState(false);

  const addressArray = post.street_address.split(" ");
  const mapped = addressArray.map((a) => `${a}+`).join("");
  const string = mapped.slice(0, mapped.length - 1);
  const addressLink = googleOne + string;
  const totalLink =
    addressLink + "+" + post.city + "+" + post.state + "+" + post.zip;

  const renderFavoriteButton = () => {
    // if this post matches one of this users favorites, the button should say remove from favorites, else say add to favorites
    // if userFaves.length === 0
    // if there are no faves, render the add to faves button
    // if there are faves, check to see if the ID of this post matches one of the faves, in that case render remove from faves
    if (!included) {
      return (
        <Button
          className="btn btn-secondary btn-lg fave-btn"
          onClick={(event) => addToFavorites(event, post)}
        >
          Add To Favorites
        </Button>
      );
    } else {
      return (
        <Button
          className="btn btn-light btn-lg fave-btn"
          onClick={(event) => removeFromFavorites(event, post)}
        >
          Remove From Favorites
        </Button>
      );
    }
    // ternary if true render Add to Faves if false render remove from faves
  };

  const emailLink = () => {
    if (!loggedUser.degree && !loggedUser.institution) {
      return `mailto:${post.contact_email}?Subject=Application to ${post.performance_type} Posting on Classique&body=Hello ${post.user_honorific} ${post.contact_last_name},%0d%0d My name is ${loggedUser.first_name} ${loggedUser.last_name}. I am a ${loggedUser.voice_type}, and I am interested in the ${post.performance_type} opportunity you have posted on Classique. Please let me know if you would like me to send any references.%0d%0d Best,%0d%0d${loggedUser.first_name} ${loggedUser.last_name}%0d%0d Preferred pronouns: ${loggedUser.pronouns}.`;
    }
    return `mailto:${post.contact_email}?Subject=Application to ${post.performance_type} Posting on Classique&body=Hello ${post.user_honorific} ${post.contact_last_name},%0d%0d My name is ${loggedUser.first_name} ${loggedUser.last_name}. I am interested in the ${post.performance_type} opportunity you have posted on Classique. I am a ${loggedUser.voice_type}, and received my ${loggedUser.degree} from ${loggedUser.institution}. Please let me know if you would like me to send any references.%0d%0d Best,%0d%0d${loggedUser.first_name} ${loggedUser.last_name}%0d%0d Preferred pronouns: ${loggedUser.pronouns}.`;
  };

  const openEmail = () => {
    window.open(emailLink(), "_blank");
  };

  const toggleModal = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <Styles>
      <Row>
        <Col>
          <Card className="bg-dark text-white rounded">
            <Card.Img className="image" src={black_background} />
            <Card.ImgOverlay className="image">
              <h3>
                Seeking {post.voice_type} for {post.performance_type} on{" "}
                {post.stringified_date}
              </h3>
              <Card.Body>
                <h5>
                  <strong>Repertoire: </strong>
                  {post.repertoire}
                </h5>
                <h5>
                  <strong>Venue Name: </strong>
                  {post.venue_name}
                </h5>
                <h5>
                  <strong>Address: </strong>
                  <Card.Link
                    variant="light"
                    color="white"
                    href={totalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.street_address}, {post.city}, {post.state} {post.zip}
                  </Card.Link>
                </h5>
                <h5>
                  <strong>Notes: </strong>
                  {post.notes}
                </h5>
                <h5>
                  <strong>Paid: </strong>
                  {post.paid ? "Yes" : "No"}
                </h5>
              </Card.Body>
              <Card.Body>
                {post.user_id !== loggedUser.id ? (
                  <div className="container">
                    <Row>
                      <Col>
                        <Button
                          className="btn btn-secondary btn-lg fave-btn"
                          onClick={openEmail}
                        >
                          Apply By Email
                        </Button>
                      </Col>
                      <Col>{renderFavoriteButton()}</Col>
                    </Row>
                  </div>
                ) : (
                  <>
                    <div className="container">
                      <Row>
                        <Col>
                          <Button
                            onClick={toggleModal}
                            className="btn btn-secondary btn-lg fave-btn"
                          >
                            Edit Post
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            onClick={(e) => deletePost(e, post.id)}
                            className="btn btn-secondary btn-lg fave-btn"
                          >
                            Delete Post
                          </Button>
                        </Col>
                      </Row>
                      <Modal show={showEditForm} onHide={toggleModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>Editing Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <EditPost
                            loggedUser={loggedUser}
                            post={post}
                            editPost={editPost}
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <div className="container">
                            <Row>
                              <Col>
                                <Button
                                  onClick={toggleModal}
                                  className="btn btn-secondary btn-lg fave-btn"
                                >
                                  Close
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card.ImgOverlay>
          </Card>
          <br />
          <br />
        </Col>
      </Row>
    </Styles>
  );
}

export default Post;
