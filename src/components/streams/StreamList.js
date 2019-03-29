import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams, deleteStream } from '../../actions'
import { Link } from 'react-router-dom';
import Modal from '../Modal';
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
// global.jQuery = $;

class StreamList extends React.Component {
  state = { toDeleteId: null, toDeleteTitle: null }

  // lifecycle methods
  componentDidMount() {
    this.props.fetchStreams();
  }

  // helper methods
  setDelete = (id, title) => {
    this.setState({ toDeleteId: id, toDeleteTitle: title });
  }

  onDelete = () => {
    window.$('#exampleModal').modal('hide')
    this.props.deleteStream(this.state.toDeleteId);
  }

  renderAdminButtons = (stream) => {
    if (this.props.currentUserId === stream.userId && this.props.currentUserId) {
      return (
        <div className="d-flex justify-content-end">
          <Link to={`/streams/edit/${stream.id}`} className="btn btn-warning my-0">Edit</Link>
          <button onClick={(e) => this.setDelete(stream.id, stream.title) } type="button" className="btn btn-danger my-0 mx-2" data-toggle="modal" data-target="#exampleModal">
            Delete
          </button>
        </div>
      );
    }
  }

  renderStreams = () => {
    return (
      this.props.streams.map((stream) => {
        return (
          <div className="card m-3" key={stream.id} style={{ width: "100%" }}>
            <div className="card-header pl-3 font-weight-bold">
              <Link to={`streams/${stream.id}`}>{stream.title}</Link>
            </div>
            <div className="card-body text-dark d-flex justify-content-between align-items-start p-2 pl-3">
              {/* <h5 className="card-title">{stream.title}</h5> */}
              <p className="card-text">{stream.description}</p>
              {this.renderAdminButtons(stream)}
            </div>
          </div>
        )
      })
    );
  }

  renderCreateButton = () => {
    if (this.props.isSignedIn) {
      return (
        <div className="d-flex justify-content-center">
          <Link to="/streams/new" className="btn btn-primary my-2">Create New Stream</Link>
        </div>
      );
    }
  }

  render() {
    // console.log(this.props.streams)

    return (
      <div>
        <div className="d-flex flex-column justify-content-center mt-4">
          {this.renderStreams()}
        </div>
        {this.renderCreateButton()}
        <Modal 
          title="Delete Stream"
          content={`Are you sure you want to delete ${this.state.toDeleteTitle}?`}
          actionName="Delete"
          action={this.onDelete} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStreams, deleteStream })(StreamList);