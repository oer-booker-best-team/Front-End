import React from "react"
import Zoom from "react-reveal/Zoom"
import axios from "axios"
import { ClipLoader } from "react-spinners"

import { Row, Button, Message } from "../../styles/formStyles"
import { LoginForm } from "../../styles/loginFormStyles"
import { Loading } from "../../styles/basicStyles"
import BackgroundImage from "../../components/BackgroundImage"

class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      userData: {
        username: "",
        password: ""
      },
      error: "",
      loading: false
    }
  }

  saveInput = event => {
    const newData = { ...this.state.userData }
    newData[event.target.name] = event.target.value
    this.setState({ userData: newData })
  }

  SignInUser = event => {
    event.preventDefault()

    const signInURL = "https://open-source-edu-books.herokuapp.com/register"
    const loginURL = "https://open-source-edu-books.herokuapp.com/login"
    axios
      .post(signInURL, this.state.userData)
      .then(res => {
        this.setState({ error: "" })
        axios
          .post(loginURL, this.state.userData)
          .then(response => {
            this.setState({ error: "" })
            localStorage.setItem("jwt", response.data.token)
            localStorage.setItem("currentUser", this.state.userData.username)
            this.props.history.push("/")
          })
          .catch(err => {
            console.log(err)
            this.setState({
              error: "There was a problem with the login, try again please"
            })
          })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: "There was a problem with the sign in, try again please"
        })
      })
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <Message error>
            <h2>{this.state.error}</h2>
          </Message>
        ) : null}
        <Loading>
          <ClipLoader
            size={150}
            color={"#BC1102"}
            loading={this.state.loading}
          />
        </Loading>
        <BackgroundImage />
        <Zoom>
          <LoginForm onSubmit={this.SignInUser}>
            <h1>Sign In</h1>
            <Row>
              <input
                name="username"
                type="text"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.username}
                required
              />
              <label htmlFor="username">
                <i className="far fa-user" /> Username
              </label>
            </Row>
            <Row>
              <input
                name="password"
                type="password"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.password}
                required
              />
              <label htmlFor="password">
                <i className="fas fa-unlock-alt" /> Password
              </label>
            </Row>
            <Button type="submit" color="primary">
              Sign In
            </Button>
          </LoginForm>
        </Zoom>
      </>
    )
  }
}

export default SignIn
