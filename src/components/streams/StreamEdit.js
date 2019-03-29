import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  // lifecycle methods
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // heper methods
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {
    if(!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h1 className="text-center mt-4">Edit Stream</h1>
        <StreamForm 
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);