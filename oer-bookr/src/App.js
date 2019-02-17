import React, { Component } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import axios from "axios"

import Navigation from "./components/navigation/Navigation"
import CategoryList from "./containers/CategoryList"
import BooksList from "./containers/BooksList"
import BookDescription from "./containers/BookDescription"
import SignIn from "./containers/Auth/SignIn"
import Login from "./containers/Auth/Login"

class App extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    //Get the list of books from server
    const endpoint = "https://oer-bookr-api.herokuapp.com/books"
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    axios
      .get(endpoint, requestOptions)
      .then(res => {
        this.setState({ books: res.data })
        this.props.history.push("/books")
      })
      .catch(err => console.log("Error fetching books!", err))
  }

  render() {
    return (
      <div>
        <Route path="/books" component={Navigation} />
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <Route path="/login" component={Login} />
          <Route
            path="/books/category/:subject"
            render={props => <BooksList {...props} books={this.state.books} />}
          />
          <Route path="/books/:id" component={BookDescription} />
          <Route
            exact
            path="/books"
            render={props => (
              <CategoryList {...props} books={this.state.books} />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
