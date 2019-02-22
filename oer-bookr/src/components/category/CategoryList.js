import React from "react"
import PropTypes from "prop-types"

import Category from "./Category"
import { Container, Header } from "../../styles/basicStyles"
import { CategoriesWrapper } from "../../styles/categoryStyles"
import BackgroundImage from "../BackgroundImage"

const CategoryList = props => {
  let categories = props.books.map(book => book.subject) //Get all subjects
  categories = categories.filter(
    (elem, pos, arr) => arr.indexOf(elem) === pos && elem !== "subject"
  ) //Filter duplicate subjects
  const createdList = props.books.filter(
    book => book.adder === localStorage.getItem("currentUser")
  )
  return (
    <>
      <BackgroundImage />
      <Container>
        <Header>
          <h1>OER Bookr </h1>
          <h2>Open Educational Resources (OER)</h2>
          <p>
            Digitized materials offered freely and openly for educators,
            students, and self-learners to use and reuse for teaching, learning,
            and research.
          </p>
        </Header>
        <CategoriesWrapper>
          {createdList.length !== 0 && (
            <Category {...props} category={"My Books"} />
          )}
          {categories.map(category => (
            <Category {...props} category={category} key={category} />
          ))}
          <Category {...props} category={"All Subjects"} />
        </CategoriesWrapper>
      </Container>
    </>
  )
}

export default CategoryList

CategoryList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object)
}
