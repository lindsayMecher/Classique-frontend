import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render(){
    return(
      <div className="nav">
        <h1>Classical Singer Connection</h1>
        {this.props.loggedUser !== null ?
          (<ul className="nav-links">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/edit-user">
              <li>Edit My Information</li>
            </Link>
            <Link to="/new-post">
              <li>New Post</li>
            </Link>
            <Link to="/favorites">
              <li>View My Favorites</li>
            </Link>
              <li>
                <button onClick={(event, props) => this.props.handleLogOut(event, this.props)}>Log Out</button>
              </li>
          </ul>)
          :
          (<ul>
            <Link to="/">
              <li>Home</li>
            </Link>
          </ul>)
        }
      </div>
    )
  }
}

export default Nav;
