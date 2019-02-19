import React from "react"
import Flip from "react-reveal/Flip"
import PropTypes from "prop-types"

import { CategoryWrapper } from "../../styles/categoryStyles"

import ancientCivilizations from "../../assets/images/categories/ancientCivilizations.jpg"
import arts from "../../assets/images/categories/arts.jpg"
import business from "../../assets/images/categories/business.jpg"
import education from "../../assets/images/categories/education.jpg"
import engineering from "../../assets/images/categories/engineering.jpg"
import language from "../../assets/images/categories/language.jpg"
import mathematics from "../../assets/images/categories/mathematics.jpg"
import all from "../../assets/images/categories/all.jpg"

const Category = props => {
  let image = ""
  switch (props.category) {
    case "History":
      image = ancientCivilizations
      break
    case "Math":
      image = mathematics
      break
    case "Arts":
      image = arts
      break
    case "Education":
      image = education
      break
    case "Science":
      image = engineering
      break
    case "Business":
      image = business
      break
    case "English":
      image = language
      break
    case "All Subjects":
      image = all
      break
    default:
      image = ""
      break
  }
  return (
    // <CategoryWrapper onClick={() => props.fetchBooks(props.category)}>
    <CategoryWrapper
      onClick={() => props.history.push(`/books/category/${props.category}`)}
    >
      <Flip left>
        <img src={image} alt="Category" />
        <p>{props.category}</p>
      </Flip>
    </CategoryWrapper>
  )
}

export default Category

Category.propTypes = {
  category: PropTypes.string
}
