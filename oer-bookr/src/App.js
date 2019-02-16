import React, { Component } from "react"
import { Route } from "react-router-dom"

import Navigation from "./components/navigation/Navigation"
import CategoryList from "./containers/CategoryList"
import BooksList from "./containers/BooksList"
import BookDescription from "./containers/BookDescription"
import SignIn from "./containers/Auth/SignIn"
import Login from "./containers/Auth/Login"

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/books" component={Navigation} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/login" component={Login} />
        <Route path="/books/category/:id" component={BooksList} />
        <Route path="/books/:id" component={BookDescription} />
        <Route exact path="/books" component={CategoryList} />
      </div>
    )
  }
}

export default App
