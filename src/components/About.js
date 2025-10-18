import React from "react";
import { Carousel, Card } from "react-bootstrap";
import recordingCroppedTwo from "../images/recordingCroppedTwo.jpg";
import choirCroppedTwo from "../images/choirCroppedTwo.jpg";
import florenciaCroppedTwo from "../images/florenciaCroppedTwo.jpg";
import harrisCropped from "../images/harrisCropped.jpg";
import csoCropped from "../images/csoCropped.jpg";
import searchDemoImg from "../images/searchDemoImg.png";
import classiqueEmail from "../images/classiqueEmail.png";
import editInfo from "../images/editInfo.png";
import editPostImg from "../images/editPostImg.png";
import myPostsImg from "../images/myPostsImg.png";
import newPostImg from "../images/newPostImg.png";
import sampleFaveImg from "../images/sampleFaveImg.png";
import samplePostImg from "../images/samplePostImg.png";
import signUpImg from "../images/signUpImg.png";
import styled from "styled-components";

const Styles = styled.div`
  .content {
    align-items: center;
  }

  .heading {
    text-align: center;
    align: center;
  }

  .headers {
    text-align: center;
    align: center;
    font-size: 20px;
  }

  .fave-btn {
    background-color: #612da1;
    &:hover {
      background-color: black;
      color: #e0e0e0;
    }
  }

  .carousel-images {
    height: 640px;
    width: 960px;
    align-items: center;
  }

  .black {
    color: black;
    background-color: white;
  }

  .white {
    color: white;
    background-color: black;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const About = () => {
  return (
    <Styles>
      <div className="container-fluid content">
        <br />
        <br />
        <h1 className="heading">Welcome to Classique</h1>
        <br />
        <br />
        <br />
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={recordingCroppedTwo} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={florenciaCroppedTwo} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={choirCroppedTwo} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={harrisCropped} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={csoCropped} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        <br />
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">Signing up is quick and easy.</Card.Text>
          </Card.Body>
          <Card.Img variant="top" src={signUpImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">Browse available opportunities like this one.</Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={samplePostImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">
              Search for specific opportunities based on any of three criteria: Voice type, city, or
              repertoire.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={searchDemoImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">
              Click &quot;Apply by email&quot; and a prepopulated email pops up.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={classiqueEmail} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">
              Save posts you are interested in to your favorites.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={sampleFaveImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">
              Need to hire a singer? Make a post and singers can apply by email.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={newPostImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">View opportunities you have posted.</Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={myPostsImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">Editing one of your posts is easy!</Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={editPostImg} />
        </Card>
        <br />
        <br />
        <br />
        <Card border="dark" bg="dark" text="white">
          <Card.Body>
            <Card.Text className="headers">It is easy to edit your information as well.</Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={editInfo} />
        </Card>
        <br />
        <br />
        <br />
      </div>
    </Styles>
  );
};

export default About;
