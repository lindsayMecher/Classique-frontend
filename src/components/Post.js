import React from 'react';
const googleOne = `https://www.google.com/maps/place/`

class Post extends React.Component {

  renderFavoriteButton = () => {
    // if this post matches one of this users favorites, the button should say remove from favorites, else say add to favorites
    // if userFaves.length === 0
    // if there are no faves, render the add to faves button
    // if there are faves, check to see if the ID of this post matches one of the faves, in that case render remove from faves
    if (!this.props.included) {
        return <button className="btn btn-primary" onClick={(event, post) => this.props.addToFavorites(event, this.props.post)}>Add To Favorites</button>
      } else {
        return <button className="btn btn-primary" onClick={(event, post) => this.props.removeFromFavorites(event, this.props.post)}>Remove From Favorites</button>
      }
    // ternary if true render Add to Faves if false render remove from faves
  }


  render(){

    const addressArray = this.props.post.street_address.split(' ')
    const mapped = addressArray.map((a) => `${a}+`).join('')
    const string = mapped.slice(0, mapped.length - 1);
    const addressLink = googleOne + string
    const totalLink = addressLink + `+` + this.props.post.city + `+` + this.props.post.state + `+` + this.props.post.zip

    return(
      <div className="card">
        <div className="card-header">
          <h2>{this.props.post.voice_type} needed for {this.props.post.performance_type} on {this.props.post.stringified_date} at {this.props.post.stringified_time}</h2>
        </div>
        <div className="card-body">
          <p className="card-text">Repertoire: {this.props.post.repertoire}</p>
          <p className="card-text">Venue Name: {this.props.post.venue_name}</p>
          <a href={totalLink} target="_blank" rel="noopener noreferrer">
            <p className="card-text">Address: {this.props.post.street_address}, {this.props.post.city}, {this.props.post.state} {this.props.post.zip}</p>
          </a>
          <p className="card-text">Contact: {this.props.post.contact_first_name} {this.props.post.contact_last_name} by email at {this.props.post.contact_email}</p>
          <p className="card-text">Additional Notes: {this.props.post.notes}</p>
          <p className="card-text">This is {this.props.post.paid === true ? "a paid" : "an unpaid"} opportunity.</p>
          <button className="btn btn-primary"><a href={`mailto:${this.props.post.contact_email}?Subject=Application to ${this.props.post.performance_type} Posting on Classical Singer Connection&body=Hello, my name is ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}. I am interested in the ${this.props.post.performance_type} opportunity you have posted on Classical Singer Connection. I am a ${this.props.loggedUser.voice_type}, and received my ${this.props.loggedUser.degree} from ${this.props.loggedUser.institution}. I have attached my resume for your review. Best, ${this.props.loggedUser.first_name} ${this.props.loggedUser.last_name}`} target="_top">Apply By Email</a></button>
          {this.renderFavoriteButton()}
        </div>
      </div>
    )
  }
}

export default Post;

// the post will an interpolated paragraph using the info the user posted. The info is detailed and can be filtered based on all criteria.  ie. voice type, date, city, etc.
