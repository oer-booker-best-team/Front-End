import React from "react"

import Book from "./Book"
import { Header } from "../../styles/basicStyles"
import { BooksWrapper } from "../../styles/bookStyles"
import BackgroundImage from "../BackgroundImage"

const BooksList = props => {
  const booksList = props.books.filter(
    book => book.subject === props.match.params.subject
  )
  return (
    <>
      <BackgroundImage />
      <Header>
        <h1>{props.match.params.id}</h1>
      </Header>{" "}
      <BooksWrapper>
        {booksList.map(book => (
          <Book key={book.id} book={book} deleteBook={props.deleteBook} />
        ))}
      </BooksWrapper>
    </>
  )
}

export default BooksList
