import React from "react"
import Component from "./component"
import {connect} from "react-redux"
import {signIn, signOut} from "../../actions"

class GoogleAuth extends React.Component{

  componentDidMount(){
    window.gapi.load('client:auth2', () => {

      window.gapi.client.init({
        clientId: '730842750906-c07uo1ar27p4m5sm7fbm07qc15l7p60g.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })

  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId())
    }
    else{
      this.props.signOut()
    }
  }

  renderAuthButton(){

    if(this.props.isSignedIn === null){
      return null
    }
    else if(this.props.isSignedIn){
      return (<button onClick={this.onSignOutEvent.bind()} className="ui red google button">
        <i className="google icon"/>
        Sign Out</button>)
    }
    return (<button onClick={this.onSignInEvent.bind()} className="ui red google button">
      <i className="google icon"/>
      Sign In</button>)
  }


  //GOOGLE AUTH METHODS
  onSignInEvent = () => {this.auth.signIn()}

  onSignOutEvent = () => {this.auth.signOut()}

  render(){
    const button = this.renderAuthButton()
    return (
      <React.Fragment>
        <Component button={button}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut}) (GoogleAuth)
