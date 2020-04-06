import React from 'react';

class Signup extends React.Component {
  render(){
    return(
      <div className="signup-div">
        <h1>Sign Up To Create An Account</h1>
        <form onSubmit={(event, props) => this.props.handleSignup(event, this.props)} className="signup">
          <label>First Name:
            <input onChange={this.props.handleChange} type="text" name="first_name" value={this.props.first_name} />
          </label><br/>
          <label>Last Name:
            <input onChange={this.props.handleChange} type="text" name="last_name" value={this.props.last_name} />
          </label><br/>
          <label>Voice Type:
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
          <label>E-mail:
            <input onChange={this.props.handleChange} type="text" name="email" value={this.props.email} />
          </label><br/>
          <label>Password:
            <input onChange={this.props.handleChange} type="text" name="password" value={this.props.password} />
          </label><br/>
          <input type="submit" name="signup" value="Sign Up!" />
        </form>
      </div>
    )
  }
}

export default Signup;
