import React, { Component } from "react"

import { books } from "../dummy-data"
import Book from "../components/book/Book"
import { BooksWrapper } from "../styles/bookStyles"

class BooksList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount = () => {
    const booksList = books.filter(
      book => book.category === this.props.match.params.id
    )
    this.setState({ books: booksList })
  }

  render() {
    return (
      <BooksWrapper>
        <h1>Category: {this.props.match.params.id}</h1>
        {this.state.books.map(book => (
          <Book key={book.id} book={book} />
        ))}
      </BooksWrapper>
    )
  }
}

export default BooksList
