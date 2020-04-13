import React from 'react';
const API = "http://localhost:3000";

class New extends React.Component {

  constructor(){
    super()
    this.state = {
      performance_type: "",
      voice_type: "",
      date: "",
      time: "",
      venue_name: "",
      street_address: "",
      city: "",
      state: "",
      zip: "",
      repertoire: "",
      notes: "",
      contact_first_name: "",
      contact_last_name: "",
      contact_email: "",
      paid: true
    }
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
          this.props.updateUser(data)
        })
        .catch(err => console.log(err))
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <div className="new-div">
        <h1>New Post</h1>
        <form onSubmit={(event, props, postObj) => this.props.handleNewPost(event, this.props, this.state)} className="new-post">
          <label>Type Of Opportunity:
            <select onChange={this.handleChange} className="performance_dropdown" name="performance_type">
              <option value="Concert">Concert</option>
              <option value="Rehearsal">Rehearsal</option>
              <option value="Master Class">Master Class</option>
              <option value="Opera Role">Opera Role</option>
              <option value="Musical Theatre Role">Musical Theatre Role</option>
              <option value="Other">Other</option>
            </select>
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
            </select>
          </label><br/>
          <label>Date:
            <input onChange={this.handleChange} type="date" name="date" value={this.state.date} />
          </label><br/>
          <label>Time:
            <input onChange={this.handleChange} type="time" name="time" value={this.state.time} />
          </label><br/>
          <label>Venue Name:
            <input onChange={this.handleChange} type="text" name="venue_name" value={this.state.venue_name} />
          </label><br/>
          <label>Street Address:
            <input onChange={this.handleChange} type="text" name="street_address" value={this.state.street_address} />
          </label><br/>
          <label>City:
            <input onChange={this.handleChange} type="text" name="city" value={this.state.city} />
          </label><br/>
          <label>State:
            <input onChange={this.handleChange} type="text" name="state" value={this.state.state} />
          </label><br/>
          <label>Zip Code:
            <input onChange={this.handleChange} type="text" name="zip" value={this.state.zip} />
          </label><br/>
          <label>Repertoire:
            <textarea onChange={this.handleChange} name="repertoire" rows="8" cols="80" value={this.state.repertoire} ></textarea>
          </label><br/>
          <label>Additional Notes:
            <textarea onChange={this.handleChange} name="notes" rows="8" cols="80" value={this.state.notes} ></textarea>
          </label><br/>
          <label>Compensation:
            <label>Paid
              <input onChange={this.handleChange} type="radio" name="paid" id="paid" value={true} />
            </label>
            <label>Unpaid
              <input onChange={this.handleChange} type="radio" name="paid" id="unpaid" value={false} />
            </label>
          </label><br/>
          <input type="submit" name="post" value="Post!" />
        </form>
      </div>
    )
  }
}

export default New;
