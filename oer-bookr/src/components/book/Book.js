import React from "react"
import { Link } from "react-router-dom"

import { BookWrapper, BookInfo } from "../../styles/bookStyles"

import ancientCivilizations from "../../assets/images/categories/ancientCivilizations.jpg"
import arts from "../../assets/images/categories/arts.jpg"
import business from "../../assets/images/categories/business.jpg"
import education from "../../assets/images/categories/education.jpg"
import engineering from "../../assets/images/categories/engineering.jpg"
import language from "../../assets/images/categories/language.jpg"
import mathematics from "../../assets/images/categories/mathematics.jpg"

const Book = props => {
  let image = ""
  switch (props.book.category) {
    case "Ancient Civilizations":
      image = ancientCivilizations
      break
    case "Mathematics":
      image = mathematics
      break
    case "Arts and Humanities":
      image = arts
      break
    case "Education":
      image = education
      break
    case "Engineering":
      image = engineering
      break
    case "Business and Communications":
      image = business
      break
    case "Language":
      image = language
      break
    default:
      image = ""
      break
  }
  return (
    <BookWrapper>
      <img src={image} alt="Book" />
      <BookInfo>
        <div>
          <span>Title:</span>
          <Link to={`/book/${props.book.id}`}> {props.book.title}</Link>
        </div>
        <div>
          <span>Author:</span> {props.book.author}
        </div>
        <div>
          <span>Publisher:</span> {props.book.publisher}
        </div>
        <div>
          <span>License:</span> {props.book.license}
        </div>
        <div>
          <span>Reviews:</span> {props.book.reviews}
        </div>
      </BookInfo>
    </BookWrapper>
  )
}

export default Book
