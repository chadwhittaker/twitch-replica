import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class GoogleAuth extends React.Component {

  componentDidMount() {
    // download the portion of Google API we need
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '442112241192-82guvi9pnst7rmv7rr0l7ndjrjtmpv5b.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange();
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = () => {
    // console.log(this.props.auth);
    if(this.auth.isSignedIn.get()) {
      this.props.signIn(this.auth.currentUser.get().getBasicProfile())
    } else {
      this.props.signOut()
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.auth.isSignedIn === null) {
      return null;
    } else if (this.props.auth.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="btn btn-danger">
          <FontAwesomeIcon icon={['fab', 'google']} color="white" className="mr-2" />
          Sign Out
        </button>
      )
    } else {
      return (
        <button onClick={this.onSignInClick} className="btn btn-danger">
          <FontAwesomeIcon icon={['fab', 'google']} color="white" className="mr-2" />
          Sign in with Google
        </button>
      )
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);