import React from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {Link} from "react-router-dom"


import history from "../../../history"
import {fetchStream, deleteStream} from "../../../actions"
import Component from "./component"
import Modal from "../../Modal_JS"

class Delete extends React.Component {

  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id)
  }

  actions = (
    <React.Fragment>
      <button onClick={() => this.props.deleteStream(this.props.match.params.id)} className="ui button primary">Delete</button>
      <Link to={"/"} className="ui button">Cancel</Link>
    </React.Fragment>
  )

  renderContent(){
    if(!this.props.stream){
      return (<p>Are you sure you want to delete this stream?</p>)
    }

    return(
      <React.Fragment>
        <p>Are you sure you want to delete this stream?</p>
        <p><strong>Title: {this.props.stream.title}</strong></p>
        <p>Description: {this.props.stream.description}</p>
      </React.Fragment>
    )
  }

  onDismiss = () => {
    history.push('/')
  }

  render(){
    console.log(this.props.stream)
    if(!this.props.stream){
      return null
    }
    if(this.props.userId !== this.props.stream.userId){
      return <h3>This stream belongs to another streamer and you cant delete it</h3>
    }
    return (
      <React.Fragment>
        <Modal
          header="Delete Stream"
          content={this.renderContent()}
          actions={this.actions}
          onDismiss={this.onDismiss}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  return {stream: state.streams[ownProps.match.params.id],userId: state.auth.userId}
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(Delete)
