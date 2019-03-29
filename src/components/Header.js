import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends React.Component {

  // helper methods
  showName() {
    if (this.props.name) {
      return <span className="navbar-text text-danger mr-2">Hi, {this.props.name}!</span>;
    } else {
      return null;
    }
  }

  showCreate() {
    if (this.props.isSignedIn) {
      return <Link className="nav-item nav-link mr-2" to="/streams/new">Create</Link>
    } else {
      return
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Streamy <FontAwesomeIcon icon={"coffee"} /> </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link mr-2" to="/">Streams</Link>
            {this.showCreate()}
            {this.showName()}
            <GoogleAuth />
          </div>
        </div>
      </nav>
    );
  }
};

const mapStateToProps = (state) => {
  return { name: state.auth.userName, isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(Header);