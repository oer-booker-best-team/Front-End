import React, { Component } from "react"

import Category from "../components/category/Category"
import { Container, Header } from "../styles/basicStyles"
import { CategoriesWrapper } from "../styles/categoryStyles"
import BackgroundImage from "../components/BackgroundImage"

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount = () => {
    //Get the list of categories from books array
    let categories = this.props.books.map(book => book.subject)
    categories = categories.filter(
      (elem, pos, arr) => arr.indexOf(elem) === pos
    )
    this.setState({ categories: categories })
  }

  fetchBooks = category => {
    this.props.history.push(`/books/category/${category}`)
  }

  render() {
    return (
      <>
        <BackgroundImage />
        <Container>
          <Header>
            <h1>OER Bookr </h1>
            <h2>Open Educational Resources (OER)</h2>
            <p>
              Digitised materials offered freely and openly for educators,
              students, and self-learners to use and reuse for teaching,
              learning, and research.
            </p>
          </Header>
          <CategoriesWrapper>
            {this.state.categories.map(category => (
              <Category
                fetchBooks={this.fetchBooks}
                category={category}
                key={category}
              />
            ))}
          </CategoriesWrapper>
        </Container>
      </>
    )
  }
}

export default CategoryList
