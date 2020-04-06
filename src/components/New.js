import React from 'react';
const POSTS = "http://localhost:3000/posts";

class New extends React.Component {
  constructor(){
    super()
    this.state = {
      performance_type: "",
      voice_type: "",
      date: null,
      time: null,
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  handleNewSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    // use this.props.loggedUser ID to post new post to database. post to /posts with user_id: loggedUser.id
    //  when sending to back end, send contact info as this.props.loggedUser.first_name etc.
    const contact_first_name = this.props.loggedUser.first_name
    const contact_last_name = this.props.loggedUser.last_name
    const contact_email = this.props.loggedUser.email
    const performance_type = e.target.performance_type.value
    const voice_type = e.target.voice_type.value
    const date = e.target.date.value
    const time = e.target.time.value
    const venue_name = e.target.venue_name.value
    const street_address = e.target.street_address.value
    const city = e.target.city.value
    const state = e.target.state.value
    const zip = e.target.zip.value
    const repertoire = e.target.repertoire.value
    const notes = e.target.notes.value
    const paid = e.target.paid.value
    const user_id = this.props.loggedUser.id
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        performance_type: performance_type,
        voice_type: voice_type,
        date: date,
        time: time,
        venue_name: venue_name,
        street_address: street_address,
        city: city,
        state: state,
        zip: zip,
        repertoire: repertoire,
        notes: notes,
        contact_first_name: contact_first_name,
        contact_last_name: contact_last_name,
        contact_email: contact_email,
        paid: paid,
        user_id: user_id
      })
    }
    fetch(POSTS, reqObj)
      .then(resp => resp.json())
      .then(post => console.log("SUCCESS", post))
      .catch(err => console.log(err))
  }

  render(){
    return(
      <div className="new-div">
        <h1>New Post</h1>
        <form onSubmit={this.handleNewSubmit} className="new-post">
          <label for="performance_type">Type Of Opportunity:
            <select onChange={this.handleChange} className="performance_dropdown" name="performance_type">
              <option value="Concert">Concert</option>
              <option value="Rehearsal">Rehearsal</option>
              <option value="Master Class">Master Class</option>
              <option value="Opera Role">Opera Role</option>
              <option value="Musical Theatre Role">Musical Theatre Role</option>
              <option value="Other">Other</option>
            </select>
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
            </select>
          </label><br/>
          <label for="date">Date:
            <input onChange={this.handleChange} type="date" name="date" value={this.state.date} />
          </label><br/>
          <label for="time">Time:
            <input onChange={this.handleChange} type="time" name="time" value={this.state.time} />
          </label><br/>
          <label for="venue_name">Venue Name:
            <input onChange={this.handleChange} type="text" name="venue_name" value={this.state.venue_name} />
          </label><br/>
          <label for="street_address">Street Address:
            <input onChange={this.handleChange} type="text" name="street_address" value={this.state.street_address} />
          </label><br/>
          <label for="city">City:
            <input onChange={this.handleChange} type="text" name="city" value={this.state.city} />
          </label><br/>
          <label for="state">State:
            <input onChange={this.handleChange} type="text" name="state" value={this.state.state} />
          </label><br/>
          <label for="zip">Zip Code:
            <input onChange={this.handleChange} type="text" name="zip" value={this.state.zip} />
          </label><br/>
          <label for="repertoire">Repertoire:
            <textarea onChange={this.handleChange} name="repertoire" rows="8" cols="80" value={this.state.repertoire} ></textarea>
          </label><br/>
          <label for="notes">Additional Notes:
            <textarea onChange={this.handleChange} name="notes" rows="8" cols="80" value={this.state.notes} ></textarea>
          </label><br/>
          <label for="radio">Compensation:</label><br/>
          <input onChange={this.handleChange} type="radio" name="paid" id="paid" value={true} />
          <label for="paid">Paid</label>
          <input onChange={this.handleChange} type="radio" name="paid" id="unpaid" value={false} />
          <label for="unpaid">Unpaid </label>
          <input type="submit" name="post" value="Post!" />
        </form>
      </div>
    )
  }
}

export default New;
