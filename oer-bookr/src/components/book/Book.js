import React from "react"
import { Link } from "react-router-dom"
import Zoom from "react-reveal/Zoom"

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
  const capitalize = str => str[0].toUpperCase() + str.slice(1)
  const sections = ["author", "publisher", "license", "reviews"]
  const makeSectionDiv = section => (
    <div key={section}>
      <span>{capitalize(section)}:</span> {props.book[section]}
    </div>
  )
  return (
    <BookWrapper>
      <Zoom>
        <img src={image} alt="Book" />
      </Zoom>
      <BookInfo>
        <div>
          <span>Title:</span>
          <Link to={`/book/${props.book.id}`}> {props.book.title}</Link>
        </div>
        {sections.map(makeSectionDiv)}
      </BookInfo>
    </BookWrapper>
  )
}

export default Book
