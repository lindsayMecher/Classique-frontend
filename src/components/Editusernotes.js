import React from 'react';
import axios from 'axios';
import { DirectUpload } from 'activestorage';
import ActiveStorageProvider from 'react-activestorage-provider';
const API = "http://localhost:3000";
const USERS = "http://localhost:3000/users";
const UPLOAD = "http://localhost:3000/rails/active_storage/direct_uploads";

class Edituser extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      headshot: "",
      resume: "",
      degree: "",
      institution: "",
      website: "",
      voice_type: "",
      email: "",
      password: "",
      biography: ""
    }
  };

  componentDidMount(){
      if (this.props.loggedUser !== null) {
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
              this.props.updateUser(data)
            })
            .catch(err => console.log(err))
        }
      } else {
        this.props.history.push('/')
      }
    };



  // handleChange = (e) => {
  //
  //   if (e.target.name === ('headshot' || 'resume')) {
  //     const val = e.target.files[0]
  //     const file = e.target.files[0]
  //     console.log(file)
  //     // const data = new FormData()
  //     // Object.keys(formObj).forEach((key, value) => {
  //     //   data.append((key, formObj[key])
  //     // }
  //     debugger
  //
  //     this.setState({
  //       [e.target.name]: val
  //     })
  //   } else {
  //     const val = e.target.value
  //     this.setState({
  //       [e.target.name]: val
  //     })
  //   }
  // }

//   handleUpload = (e) => {
//
// //     const data = new FormData()
// // Object.keys(formObj).forEach((key, value) => {
// // data.append((key, formObj[key])
// // }
//
//     const name = e.target.name
//     let file = e.target.files[0]
//     console.log(file)
//     let reader = new FileReader();
//     reader.readAsDataURL(file)
//     reader.onload = (e) => {
//       console.log("file data", e.target.result)
//       const fileObj = {
//         file: e.target.result
//       };
//
//        // let request = new XMLHttpRequest();
//        //    request.open("POST", `${USERS}/${this.props.loggedUser.id}`);
//        //    request.send(fileObj);
//        //  };
//       fetch(`${USERS}/${this.props.loggedUser.id}`, fileObj)
//         .then(response => console.log())
//       debugger
//     }
//   };

  handleHeadshotUpload = (e) => {
    console.log(e.target.files[0])
    const headshot = e.target.files[0]
    this.setState({
      headshot: headshot
    })
  }

  handleResumeUpload = (e) => {
    console.log(e.target.files[0])
    const resume = e.target.files[0]
    this.setState({
      resume: resume
    })
  }

  fileUploadHandler = (e) => {
    const name = e.target.name
    const data = new FormData();
    data.append('headshot', this.state.headshot, this.state.headshot.name)
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: data
    }
    fetch(UPLOAD, reqObj)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // this.state.name
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }



  render(){
    return(
      <div className="edit-div">
        <h1>Edit My Information</h1>

            <label>Headshot:
              <input onChange={this.handleHeadshotUpload} type="file" name="headshot" /><br/>
              <button onClick={this.fileUploadHandler}>Upload</button>
            </label><br/>
            <label>Resume:
              <input onChange={this.handleResumeUpload} type="file" name="resume" /><br/>
              <button onClick={this.fileUploadHandler}>Upload</button>
            </label><br/>

        <form onSubmit={(event, props, userObj) => this.props.handleEdit(event, this.props, this.state)} className="edit-user">
          <label>First Name:
            <input onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} />
          </label><br/>
          <label>Last Name:
            <input onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name} />
          </label><br/>

          <label>Highest Degree Earned:
            <select onChange={this.handleChange} className="degree_dropdown" name="degree">
              <option value="GED">GED</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Associate's">Associate's</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Performance Certificate">Performance Certificate</option>
              <option value="PhD">PhD</option>
            </select>
          </label><br/>
          <label>Awarding Institution:
            <input onChange={this.handleChange} type="text" name="institution" value={this.state.institution} />
          </label><br/>
          <label>Voice Type:
            <select onChange={this.handleChange} className="voice_type_dropdown" name="voice_type">
              <option value="Soprano">Soprano</option>
              <option value="Mezzo-Soprano">Mezzo-Soprano</option>
              <option value="Contralto">Contralto</option>
              <option value="Countertenor">Countertenor</option>
              <option value="Tenor">Tenor</option>
              <option value="Baritone">Baritone</option>
              <option value="Bass-Baritone">Bass-Baritone</option>
              <option value="Bass">Bass</option>
              <option value="N/A">Not Applicable (N/A)</option>
            </select>
          </label><br/>
          <label>Biography:
            <textarea onChange={this.handleChange} name="biography" rows="8" cols="80" value={this.state.biography}></textarea>
          </label><br/>
          <label>Personal Website:
            <input onChange={this.handleChange} type="text" name="website" value={this.state.website} />
          </label><br/>
          <label>E-mail:
            <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
          </label><br/>
          <label>Password:
            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
          </label><br/>
          <input type="submit" name="update" value="Update!" />
        </form>
      </div>
    )
  }
}

export default Edituser;

{/* <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" value="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>

  <Form.Group id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}