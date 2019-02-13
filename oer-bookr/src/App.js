import React, { Component } from "react"
import Authenticate from "./hoc/Authenticate"
import { Route } from "react-router-dom"

import Navigation from "./components/navigation/Navigation"
import CategoryList from "./containers/CategoryList"
import BooksList from "./containers/BooksList"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Route path="/category/:id" component={BooksList} />
        <Route exact path="/" component={CategoryList} />
        {/* Books list for a category path='/category' */}
        {/* Book description route  path='/category/id'*/}
        {/* Add review route/modal */}
      </div>
    )
  }
}

export default Authenticate(App)
