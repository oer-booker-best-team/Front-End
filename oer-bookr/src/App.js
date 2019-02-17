import React from "react"
import { Route, Switch } from "react-router-dom"

import SignIn from "./containers/Auth/SignIn"
import Login from "./containers/Auth/Login"
import Books from "./containers/Books"

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/signIn" component={SignIn} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Books} />
      </Switch>
    </div>
  )
}

export default App
