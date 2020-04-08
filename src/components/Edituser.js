import React from 'react';
const API = "http://localhost:3000";

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
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

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
          console.log(data)
        })
        .catch(err => console.log(err))
    }
  }

  render(){
    return(
      <div className="edit-div">
        <h1>Edit My Information</h1>
        <form onSubmit={(event, props, userObj) => this.props.handleEdit(event, this.props, this.state)} className="edit-user">
          <label for="first_name">First Name:
            <input onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name} />
          </label><br/>
          <label for="last_name">Last Name:
            <input onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name} />
          </label><br/>
          <label for="headshot">Headshot:
            <input onChange={this.handleChange} type="text" name="headshot" value={this.state.headshot} />
          </label><br/>
          <label for="resume">Resume:
            <input onChange={this.handleChange} type="text" name="resume" value={this.state.resume} />
          </label><br/>
          <label for="degree">Highest Degree Earned:
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
          <label for="institution">Awarding Institution:
            <input onChange={this.handleChange} type="text" name="institution" value={this.state.institution} />
          </label><br/>
          <label for="voice_type">Voice Type:
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
          <label for="biography">Biography:
            <textarea onChange={this.handleChange} name="biography" rows="8" cols="80" value={this.state.biography}></textarea>
          </label><br/>
          <label for="website">Personal Website:
            <input onChange={this.handleChange} type="text" name="website" value={this.state.website} />
          </label><br/>
          <label for="email">E-mail:
            <input onChange={this.handleChange} type="text" name="email" value={this.state.email} />
          </label><br/>
          <label for="password">Password:
            <input onChange={this.handleChange} type="text" name="password" value={this.state.password} />
          </label><br/>
          <input type="submit" name="update" value="Update!" />
        </form>
      </div>
    )
  }
}

export default Edituser;
