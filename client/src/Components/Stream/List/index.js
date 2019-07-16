import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"

import Component from "./component"
import {fetchStreams} from  "../../../actions"

class List extends React.Component {

  componentDidMount(){
    this.props.fetchStreams()
  }

  renderList(){
    return this.props.streams.map(stream => {
        return (
          <div className="item" key={stream.id}>
            {this.renderAdmin(stream)}
            <i className="large middle aligned icon camera"/>
            <div className="content">
              <Link to={`/streams/${stream.id}`} className="header">
                <h3>{stream.title}</h3>
              </Link>
              <div className="description">{stream.description}</div>
            </div>
          </div>
      )
      })
  }

  renderAdmin(stream){
    if(stream.userId === this.props.auth.userId){
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      )
    }
    return null
  }

  renderCreate(){
    if(this.props.auth.isSignedIn){
      return (
        <div style={{textAlign: 'right'}}>
          <Link to="/streams/new" className="ui button primary">Create Stream</Link>
        </div>
      )
    }
  }

  render(){
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    streams: Object.values(state.streams),
    auth: state.auth
  }
}

export default connect(mapStateToProps,{fetchStreams})(List)
