import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

  // heper methods
  renderError(meta) {
    // this method decides when to display errors
    if (meta.touched && meta.error) {
      return (
          <div className="text-danger font-italic">
            {meta.error}
          </div>
      );
    }
  }

  renderInput = (formProps) => {
    // console.log(formProps)
    return (
      <div className="form-group">
        <label htmlFor={formProps.id}>{formProps.label}</label>
        <input {...formProps.input} type="text" className="form-control" id={formProps.id} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="mt-4 mx-auto" style={{ maxWidth: "600px" }}>
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title:"
            id="formTitle"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
            id="formDescription"
          />
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

// this detects errors and saves in object
const validateForm = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate: validateForm
})(StreamForm);