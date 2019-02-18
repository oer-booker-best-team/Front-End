import React, { Component } from "react"
import { Route, withRouter, Switch } from "react-router-dom"
import axios from "axios"

import Navigation from "../components/navigation/Navigation"
import CategoryList from "../components/category/CategoryList"
import BooksList from "../components/book/BooksList"
import BookDescription from "./BookDescription"
import BookForm from "./BookForm"

class Books extends Component {
  state = {
    booksList: []
  }

  componentDidMount = () => {
    //Get the list of books from server
    this.updateBooks()
  }

  updateBooks = () => {
    const endpoint = "https://oer-bookr-api.herokuapp.com/books"
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      axios
        .get(endpoint, requestOptions)
        .then(res => {
          this.setState({ booksList: res.data })
        })
        .catch(err => console.log("Error fetching books!", err))
    }
  }

  deleteHandler = id => {
    const endpoint = `https://oer-bookr-api.herokuapp.com/books/${id}`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      axios
        .delete(endpoint, requestOptions)
        .then(res => {
          this.updateBooks()
        })
        .catch(err => console.log("Error fetching books!", err))
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route
            path="/books/category/:subject"
            render={props => (
              <BooksList
                {...props}
                books={this.state.booksList}
                deleteBook={this.deleteHandler}
              />
            )}
          />
          <Route
            exact
            path="/books/add"
            render={props => (
              <BookForm {...props} type="Add" update={this.updateBooks} />
            )}
          />
          <Route
            exact
            path="/books/update/:id"
            render={props => (
              <BookForm {...props} type="Update" update={this.updateBooks} />
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
