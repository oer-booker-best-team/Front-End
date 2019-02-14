import React, { Component } from "react"
import Authenticate from "./hoc/Authenticate"
import { Route } from "react-router-dom"

import Navigation from "./components/navigation/Navigation"
import CategoryList from "./containers/CategoryList"
import BooksList from "./containers/BooksList"
import BookDescription from "./containers/BookDescription"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route path="/category/:id" component={BooksList} />
        <Route path="/book/:id" component={BookDescription} />
        <Route exact path="/" component={CategoryList} />
        {/* Add review route/modal */}
      </div>
    )
  }
}

export default Authenticate(App)
