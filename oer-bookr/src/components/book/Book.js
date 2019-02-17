import React from "react"
import { Link } from "react-router-dom"
import Zoom from "react-reveal/Zoom"

import { BookWrapper, BookInfo } from "../../styles/bookStyles"

const Book = props => {
  const capitalize = str => str[0].toUpperCase() + str.slice(1)
  const sections = ["author", "publisher", "license"]
  const makeSectionDiv = section => (
    <div key={section}>
      <span>{capitalize(section)}:</span> {props.book[section]}
    </div>
  )
  let reviews = 0
  if (props.book.reviews) reviews = props.book.reviews.length

  return (
    <BookWrapper>
      <Zoom>
        <img src={props.book.image} alt="Book" />
      </Zoom>
      <BookInfo>
        <div>
          <span>Title:</span>
          <Link to={`/books/${props.book.id}`}> {props.book.title}</Link>
        </div>
        {sections.map(makeSectionDiv)}
        <div>
          <span>Reviews:</span> {reviews}
        </div>
      </BookInfo>
    </BookWrapper>
  )
}

export default Book
