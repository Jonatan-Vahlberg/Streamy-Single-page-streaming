import React from "react"
import {connect} from "react-redux"
import _ from 'lodash'

import {updateStream, fetchStream} from "../../../actions"
import StreamForm from "../streamForm"

class Edit extends React.Component {

  componentDidMount(){

    this.props.fetchStream(this.props.match.params.id)

  }

  onSubmit = (formValues) => {
    this.props.updateStream(this.props.match.params.id,formValues)
  }

  render(){
    if(!this.props.stream){
      return null
    }
    if(this.props.userId !== this.props.stream.userId){
      return <h3>This stream belongs to another streamer and you cant edit it</h3>
    }
    return (
      <div>
        <h2>Edit Stream</h2>
        <StreamForm
          initialValues={_.pick(this.props.stream,'title','description')}
          onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

 const mapStateToProps = (state,ownProps) =>{
   return{
     stream: state.streams[ownProps.match.params.id],
     userId: state.auth.userId
   }
 }

export default connect(mapStateToProps,{updateStream, fetchStream})(Edit)
