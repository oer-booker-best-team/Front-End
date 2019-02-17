import React from "react"
import Rotate from "react-reveal/Rotate"
import axios from "axios"

import { InputLabel, InputBox, Button } from "../../styles/formStyles"
import { LoginForm } from "../../styles/loginFormStyles"

class SignIn extends React.Component {
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

  SignInUser = event => {
    event.preventDefault()

    const signInURL = "https://oer-bookr-api.herokuapp.com/register"
    const loginURL = "https://oer-bookr-api.herokuapp.com/login"
    axios
      .post(signInURL, this.state)
      .then(res => {
        console.log("response from register: ", res)
        axios
          .post(loginURL, this.state)
          .then(response => {
            console.log("response from login: ", response)
            localStorage.setItem("jwt", response.data.token)
            this.props.history.push("/books")
          })
          .catch(err => {
            console.log(err)
            this.props.history.push("/login")
          })
        this.props.history.push("/login")
      })
      .catch(error => {
        console.log(error)
        this.props.history.push("/signIn")
      })
  }

  render() {
    return (
      <Rotate top left>
        <LoginForm onSubmit={this.SignInUser}>
          <h1>Sign In</h1>
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
            Sign In
          </Button>
        </LoginForm>
      </Rotate>
    )
  }
}

export default SignIn
