import React from "react"

import { CategoryWrapper } from "../../styles/categoryStyles"

import ancientCivilizations from "../../assets/images/categories/ancientCivilizations.jpg"
import arts from "../../assets/images/categories/arts.jpg"
import business from "../../assets/images/categories/business.jpg"
import education from "../../assets/images/categories/education.jpg"
import engineering from "../../assets/images/categories/engineering.jpg"
import language from "../../assets/images/categories/language.jpg"
import mathematics from "../../assets/images/categories/mathematics.jpg"

const Category = props => {
  let image = ""
  switch (props.category.name) {
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
    <CategoryWrapper onClick={() => props.fetchBooks(props.category.name)}>
      <img src={image} alt="Category" />
      <p>{props.category.name}</p>
    </CategoryWrapper>
  )
}

export default Category
