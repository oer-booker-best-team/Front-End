import React from "react"

import { InputLabel, InputBox, Button } from "../../styles/formStyles"
import { LoginForm } from "../../styles/loginFormStyles"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: ""
    }
  }

  saveInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  loginUser = () => {
    if (this.state.username)
      localStorage.setItem("currentUser", this.state.username)
  }

  render() {
    return (
      <LoginForm onSubmit={this.loginUser}>
        <div>
          <InputLabel htmlFor="username">Username</InputLabel>
          <InputBox
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.saveInput}
            value={this.state.username}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.saveInput}
            value={this.state.password}
          />
        </div>
        <Button type="submit" color="primary">
          Login
        </Button>
      </LoginForm>
    )
  }
}

export default Login
