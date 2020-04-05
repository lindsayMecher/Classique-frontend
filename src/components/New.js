import React from 'react';

class New extends React.Component {
  render(){
    return(
      <div className="new-div">
        <h1>New Post</h1>
        <form className="new-post">
          <label for="performance_type">Type Of Opportunity</label>
            <select className="performance_dropdown" name="performance_type">
              <option value="concert">Concert</option>
              <option value="rehearsal">Rehearsal</option>
              <option value="master-class">Master Class</option>
              <option value="opera-role">Opera Role</option>
              <option value="musical-theatre">Musical Theatre Role</option>
              <option value="other">Other</option>
            </select>
          <label for="voice_type">Voice Type</label>
          <select className="voice_type_dropdown" name="voice_type">
            <option value="soprano">Soprano</option>
            <option value="mezzo-soprano">Mezzo-Soprano</option>
            <option value="contralto">Contralto</option>
            <option value="countertenor">Countertenor</option>
            <option value="tenor">Tenor</option>
            <option value="baritone">Baritone</option>
            <option value="bass-baritone">Bass-Baritone</option>
            <option value="bass">Bass</option>
          </select>
          <label for="date">Date</label>
          <input type="date" name="date" value="" />
          <label for="time">Time</label>
          <input type="time" name="time" value="" />
          <label for="venue_name">Venue Name</label>
          <input type="text" name="venue_name" value="" />
          <label for="street_address">Street Address</label>
          <input type="text" name="street_address" value="" />
          <label for="city">City</label>
          <input type="text" name="city" value="" />
          <label for="state">State</label>
          <input type="text" name="state" value="" />
          <label for="zip">Zip Code</label>
          <input type="text" name="zip" value="" />
          <label for="repertoire">Repertoire</label>
          <textarea name="repertoire" rows="8" cols="80"></textarea>
          <label for="notes">Additional Notes</label>
          <textarea name="notes" rows="8" cols="80"></textarea>
          <label for="radio">Compensation</label>
          <input type="radio" name="paid" id="paid" value="paid" />
          <label for="paid">Paid</label>
          <input type="radio" name="paid" id="unpaid" value="unpaid" />
          <label for="unpaid">Unpaid </label>
          <input type="submit" name="update" value="Update!" />
        </form>
      </div>
    )
  }
}

export default New;
