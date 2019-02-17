import React, { Component } from "react"

import Book from "../components/book/Book"
import { Header } from "../styles/basicStyles"
import { BooksWrapper } from "../styles/bookStyles"
import BackgroundImage from "../components/BackgroundImage"

class BooksList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount = () => {
    const booksList = this.props.books.filter(
      book => book.subject === this.props.match.params.subject
    )
    this.setState({ books: booksList })
  }

  render() {
    return (
      <>
        <BackgroundImage />
        <Header>
          <h1>{this.props.match.params.id}</h1>
        </Header>{" "}
        <BooksWrapper>
          {this.state.books.map(book => (
            <Book key={book.id} book={book} />
          ))}
        </BooksWrapper>
      </>
    )
  }
}

export default BooksList
