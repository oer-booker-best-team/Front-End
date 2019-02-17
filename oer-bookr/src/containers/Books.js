import React, { Component } from "react"
import { Route, withRouter, Switch } from "react-router-dom"
import axios from "axios"

import Navigation from "../components/navigation/Navigation"
import CategoryList from "../components/category/CategoryList"
import BooksList from "../components/book/BooksList"
import BookDescription from "./BookDescription"

class Books extends Component {
  state = {
    booksList: []
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
        this.setState({ booksList: res.data })
      })
      .catch(err => console.log("Error fetching books!", err))
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route
            path="/books/category/:subject"
            render={props => (
              <BooksList {...props} books={this.state.booksList} />
            )}
          />
          <Route path="/books/:id" component={BookDescription} />
          <Route
            exact
            path="/"
            render={props => (
              <CategoryList {...props} books={this.state.booksList} />
            )}
          />
        </Switch>
      </div>
    )
  }
}

export default withRouter(Books)
