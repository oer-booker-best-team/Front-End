import React, { Component } from "react"
import Authenticate from "./hoc/Authenticate"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to OER Bookr!!!</h1>
        {/* <HomePage /> */}
      </div>
    )
  }
}

export default Authenticate(App)
