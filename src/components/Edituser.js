import React from 'react';

class Edituser extends React.Component {
  render(){
    return(
      <div className="edit-div">
        <h1>Edit My Information</h1>
        <form className="edit-user">
          <label for="first_name">First Name:
            <input onChange={this.props.handleChange} type="text" name="first_name" value={this.props.first_name} />
          </label><br/>
          <label for="last_name">Last Name:
            <input onChange={this.props.handleChange} type="text" name="last_name" value={this.props.last_name} />
          </label><br/>
          <label for="headshot">Headshot:
            <input onChange={this.props.handleChange} type="text" name="headshot" value={this.props.headshot} />
          </label><br/>
          <label for="resume">Resume:
            <input onChange={this.props.handleChange} type="text" name="resume" value={this.props.resume} />
          </label><br/>
          <label for="degree">Highest Degree Earned:
            <select onChange={this.props.handleChange} className="degree_dropdown" name="degree">
              <option value="ged">GED</option>
              <option value="high_school_diploma">High School Diploma</option>
              <option value="associate">Associate's</option>
              <option value="bachelor">Bachelor's</option>
              <option value="master">Master's</option>
              <option value="certificate">Performance Certificate</option>
              <option value="doctorate">PhD</option>
            </select>
          </label><br/>
          <label for="institution">Awarding Institution:
            <input onChange={this.props.handleChange} type="text" name="institution" value={this.props.institution} />
          </label><br/>
          <label for="voice_type">Voice Type:
            <select onChange={this.props.handleChange} className="voice_type_dropdown" name="voice_type">
              <option value="soprano">Soprano</option>
              <option value="mezzo-soprano">Mezzo-Soprano</option>
              <option value="contralto">Contralto</option>
              <option value="countertenor">Countertenor</option>
              <option value="tenor">Tenor</option>
              <option value="baritone">Baritone</option>
              <option value="bass-baritone">Bass-Baritone</option>
              <option value="bass">Bass</option>
            </select>
          </label><br/>
          <label for="biography">Biography:
            <textarea onChange={this.props.handleChange} name="biography" rows="8" cols="80" value={this.props.biography}></textarea>
          </label><br/>
          <label for="website">Personal Website:
            <input onChange={this.props.handleChange} type="text" name="website" value={this.props.website} />
          </label><br/>
          <label for="email">E-mail:
            <input onChange={this.props.handleChange} type="text" name="email" value={this.props.email} />
          </label><br/>
          <label for="password">Password:
            <input onChange={this.props.handleChange} type="text" name="password" value={this.props.password} />
          </label><br/>
          <input type="submit" name="update" value="Update!" />
        </form>
      </div>
    )
  }
}

export default Edituser;
