import React from "react"
import Rotate from "react-reveal/Rotate"

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

    /*
      const endpoint = `${process.env.REACT_APP_URL}/login`;
      axios
      .post(endpoint, this.state);
      .then(res => {
        localstorage.setItem('jwt', res.data.token);
      })
      .catch(err => console.err(err));
    */
  }

  render() {
    return (
      <Rotate top left>
        <LoginForm onSubmit={this.loginUser}>
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

export default Login
