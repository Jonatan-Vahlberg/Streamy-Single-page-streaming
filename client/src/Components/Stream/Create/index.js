import React from "react"
import {connect} from  'react-redux'

import StreamForm from "../streamForm"
import {createStream} from "../../../actions"


class Create extends React.Component {
  render(){
    return (
      <div>
        <h2>Create Stream</h2>
        <StreamForm onSubmit={this.props.createStream}/>
      </div>
    )

  }
}
export default connect(null,{createStream})(Create)
