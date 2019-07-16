import React from "react"
import {Router, Route, Switch} from "react-router-dom"

import history from "../../history"
import Header from "../Header"

import StreamCreate from "../Stream/Create"
import StreamList from "../Stream/List"
import StreamEdit from "../Stream/Edit"
import StreamShow from "../Stream/Show"
import StreamDelete from "../Stream/Delete"

export default props => {

  return (
    <div className="ui container">
      <Router history={history}>
        <Header/>
        <Switch>
          <Route path="/" exact component={StreamList}/>
          <Route path="/streams/new" exact component={StreamCreate}/>
          <Route path="/streams/edit/:id" exact component={StreamEdit}/>
          <Route path="/streams/delete/:id" exact component={StreamDelete}/>
          <Route path="/streams/:id" exact component={StreamShow}/>
        </Switch>
      </Router>
    </div>
  )
}
