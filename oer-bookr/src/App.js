import React, { Component } from "react"
import Authenticate from "./hoc/Authenticate"

import Navigation from "./components/navigation/Navigation"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {/* Login route */}
        {/* Home page/category list route path='/' */}
        {/* Books list for a category path='/category' */}
        {/* Book description route  path='/category/id'*/}
        {/* Add review route/modal */}
      </div>
    )
  }
}

export default Authenticate(App)
