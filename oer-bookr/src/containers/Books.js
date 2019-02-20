import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import axios from "axios"
import { ClipLoader } from "react-spinners"

import Navigation from "../components/navigation/Navigation"
import CategoryList from "../components/category/CategoryList"
import BooksList from "../components/book/BooksList"
import BookDescription from "./BookDescription"
import BookForm from "./BookForm"
import { Loading } from "../styles/basicStyles"
import { Message } from "../styles/formStyles"

class Books extends Component {
  state = {
    booksList: [],
    error: "",
    loading: false
  }

  componentDidMount = () => {
    //Get the list of books from server
    this.updateBooks()
  }

  updateBooks = () => {
    const endpoint = "https://open-source-edu-books.herokuapp.com/books"
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      this.setState({ error: "", loading: true })
      axios
        .get(endpoint, requestOptions)
        .then(res => {
          this.setState({ booksList: res.data, error: "", loading: false })
        })
        .catch(err =>
          this.setState({ error: "Error fetching book!", loading: false })
        )
    }
  }

  deleteHandler = id => {
    const endpoint = `https://open-source-edu-books.herokuapp.com/books/${id}`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      this.setState({ error: "", loading: true })
      axios
        .delete(endpoint, requestOptions)
        .then(res => {
          this.setState({ error: "", loading: false })
          this.updateBooks()
        })
        .catch(err =>
          this.setState({ error: "Error deleting book!", loading: false })
        )
    }
  }

  action = (bookInfo, type, id) => {
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      if (type === "Add") {
        const bookInfoURL = `https://open-source-edu-books.herokuapp.com/books`
        bookInfo.adder = localStorage.getItem("currentUser")
        this.setState({ error: "", loading: true })
        axios
          .post(bookInfoURL, bookInfo, requestOptions)
          .then(res => {
            this.setState({ error: "", loading: false })
            this.updateBooks()
            this.props.history.push(`/books/category/My%20Books`)
          })
          .catch(err => {
            this.setState({
              error: "Error adding book! -- " + this.state.error,
              loading: false
            })
          })
      } else if (type === "Update") {
        const getBookInfoUrl = `https://open-source-edu-books.herokuapp.com/books/${id}`

        this.setState({ error: "", loading: true })
        axios
          .put(getBookInfoUrl, bookInfo, requestOptions)
          .then(res => {
            this.setState({ error: "", loading: false })
            this.updateBooks()
            this.props.history.goBack()
          })
          .catch(err =>
            this.setState({
              error: "Error updating book! -- " + this.state.error,
              loading: false
            })
          )
      }
    }
  }

  render() {
    return (
      <div>
        <Navigation />
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
            path="/books/add"
            render={props => (
              <BookForm {...props} type="Add" action={this.action} />
            )}
          />
          <Route
            path="/books/update/:id"
            render={props => (
              <BookForm {...props} type="Update" action={this.action} />
            )}
          />
          <Route
            path="/books/:id"
            render={props => (
              <BookDescription {...props} deleteBook={this.deleteHandler} />
            )}
          />
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

export default Books
