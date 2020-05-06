import React from 'react';
import { Card, Container, Row, Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import black_background from '../black_background.png';
import styled from 'styled-components';
const API = "http://localhost:3000";



const Styles = styled.div`
    .headers {
        text-align: center;
        align: center;
    }

    .image{
      opacity: 0.9
    }

    a {
      color: #FFF;
    }

    a:hover {
       color: #612da1;
    }

    .fave-btn {
      background-color: #612da1;
      &:hover{
        background-color: #e0e0e0;
        color: #612da1;
      }
    }

    .remove-btn {
      background-color: #e0e0e0;
      &:hover{
        background-color: #612da1;
        color: #e0e0e0;
      }
    }
    
`;

class Profile extends React.Component{

    componentDidMount(){

        const token = localStorage.getItem('token')
        if (!token) {
          this.props.history.push('/')
        } else {
          const reqObj = {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            },
          };
          fetch(`${API}/current_user`, reqObj)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
              this.props.updateUser(data);
            })
            .catch(err => console.log(err))
        }
      }

      renderUserInfo = () => {
          return (
              <Container>
                <h1>Hello {this.props.loggedUser.first_name}</h1>
                <img src={this.props.loggedUser.headshot} alt="pic" />
              </Container>
          )
      }

    render(){
        return(
            <>
            {this.props.loggedUser ? 
            this.renderUserInfo()
                       
            :
            null
        }
            
            </>
        )
    }
};

export default Profile;