import React from "react"
import {Link} from "react-router-dom"
import GoogleAuth from "../Google_Auth_Js"

export default props => {

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">Streamy</Link>
      <div className="right menu"></div>
      <Link to="/" className="item">All Streams</Link>
      <GoogleAuth className="item"/>
    </div>
  )
}
