import React from 'react';
import { connect } from 'react-redux'
import { deleteStream } from '../actions';

class Modal extends React.Component {

  render() {
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.content}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={(e) => this.props.action()} type="button" className="btn btn-danger">{this.props.actionName}</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { 
    title: ownProps.title,
    content: ownProps.content,
    actionName: ownProps.actionName,
    action: ownProps.action
  }
}

export default connect(mapStateToProps, {deleteStream})(Modal);