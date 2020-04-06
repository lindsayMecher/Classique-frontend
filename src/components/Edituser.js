import React from 'react';

class Edituser extends React.Component {
  render(){
    return(
      <div className="edit-div">
        <h1>Edit My Information</h1>
        <form onSubmit={(event, props) => this.props.handleEdit(event, this.props)} className="edit-user">
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
            <input onChange={this.props.handleChange} type="text" name="institution" value={this.props.institution} />
          </label><br/>
          <label for="voice_type">Voice Type:
            <select onChange={this.props.handleChange} className="voice_type_dropdown" name="voice_type">
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
