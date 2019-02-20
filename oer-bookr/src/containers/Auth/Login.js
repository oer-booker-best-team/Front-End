import React from "react"
import Zoom from "react-reveal/Zoom"
import axios from "axios"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import {
  InputLabel,
  InputBox,
  Button,
  Message,
  MessageLogin
} from "../../styles/formStyles"
import { LoginForm } from "../../styles/loginFormStyles"
import { Loading } from "../../styles/basicStyles"
import BackgroundImage from "../../components/BackgroundImage"

class SignIn extends React.Component {
  constructor(props) {
    super(props)
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
    const loginURL = "https://open-source-edu-books.herokuapp.com/login"
    this.setState({ loading: true })
    axios
      .post(loginURL, this.state.userData)
      .then(res => {
        this.setState({ error: "", loading: false })
        localStorage.setItem("jwt", res.data.token)
        localStorage.setItem("currentUser", this.state.userData.username)
        this.props.history.push("/")
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: "There was a problem with the login, try again please",
          loading: false
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
            <h1>Login</h1>
            <div>
              <InputLabel htmlFor="username">
                <i className="far fa-user" /> Username
              </InputLabel>
              <InputBox
                name="username"
                type="text"
                onChange={this.saveInput}
                value={this.state.username}
                required
              />
            </div>
            <div>
              <InputLabel htmlFor="password">
                <i className="fas fa-unlock-alt" /> Password
              </InputLabel>
              <InputBox
                name="password"
                type="password"
                onChange={this.saveInput}
                value={this.state.password}
                required
              />
            </div>
            <Button type="submit" color="primary">
              Login
            </Button>
            <MessageLogin>
              If not registered, please <Link to="/signIn">Sign In</Link>
            </MessageLogin>
          </LoginForm>
        </Zoom>
      </>
    )
  }
}

export default SignIn
