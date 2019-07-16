import React from "react"
import {Field, reduxForm} from "redux-form"
import {Link} from "react-router-dom"

class StreamForm extends React.Component {
  renderInput =({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? ' error' : ''}`
    return (
      <div className="field">
        <label>{label}</label>
        <input {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    )
  }

  renderError = ({error,touched}) => {
    return (touched && error != null) && <div className="ui error message">{error}</div>
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues)
  }

  render(){

    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description"  />
        <button className="ui button primary">Submit</button>
        <Link to={"/"} className="ui button negative">Cancel</Link>
      </form>
    )

  }
}

const validate = (formValues) => {
  const errors = {}
  if(!formValues.title) {
    errors.title = 'You must enter a title'
  }
  if(!formValues.description) {
    errors.description = 'You must enter a description'
  }

  return errors
}

export default reduxForm({form: 'STREAM_FORM',validate})(StreamForm)
