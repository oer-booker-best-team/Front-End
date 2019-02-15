import React, { Component } from "react"

import { books } from "../dummy-data"
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
    const booksList = books.filter(
      book => book.category === this.props.match.params.id
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
