import React from "react"
import Rotate from "react-reveal/Rotate"
import axios from "axios"

import { InputLabel, InputBox, Button } from "../../styles/formStyles"
import { LoginForm } from "../../styles/loginFormStyles"

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  saveInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  SignInUser = event => {
    event.preventDefault()
    const loginURL = "https://oer-bookr-api.herokuapp.com/login"
    axios
      .post(loginURL, this.state)
      .then(res => {
        localStorage.setItem("jwt", res.data.token)
        localStorage.setItem("currentUser", this.state.username)
        this.props.history.push("/")
      })
      .catch(err => {
        console.log(err)
        this.props.history.push("/login")
      })
  }

  render() {
    return (
      <Rotate top left>
        <LoginForm onSubmit={this.SignInUser}>
          <h1>Login</h1>
          <div>
            <InputLabel htmlFor="username">
              <i className="far fa-user" /> Username
            </InputLabel>
            <InputBox
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.saveInput}
              value={this.state.username}
            />
          </div>
          <div>
            <InputLabel htmlFor="password">
              <i className="fas fa-unlock-alt" /> Password
            </InputLabel>
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
      </Rotate>
    )
  }
}

export default SignIn
