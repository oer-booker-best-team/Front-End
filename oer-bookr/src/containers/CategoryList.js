import React, { Component } from "react"

import Category from "../components/category/Category"
import { Container, Header, App } from "../styles/basicStyles"
import { CategoriesWrapper } from "../styles/categoryStyles"

import categories from "../dummy-data"

class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
  }

  componentDidMount = () => {
    //Get the categories from sever when ready
    this.setState({
      categories: categories
    })
  }

  fetchBooks = category => {
    console.log(this.props)
    this.props.history.push(`/category/${category}`)
  }

  render() {
    return (
      <Container>
        <Header>
          <img
            src="https://www.clipartmax.com/png/small/0-3414_clipart-pile-of-books-cartoon-free-download-clip-art-cartoon-pile-of.png"
            width="33"
            height="33"
            className="d-inline-block align-top"
            alt=""
          />
          <App>OER Bookr - Open Educational Resources (OER)</App>
          <p>
            Digitised materials offered freely and openly for educators,
            students, and self-learners to use and reuse for teaching, learning,
            and research.
          </p>
        </Header>
        <CategoriesWrapper>
          {this.state.categories.map(category => (
            <Category
              fetchBooks={this.fetchBooks}
              category={category}
              key={category.name}
            />
          ))}
        </CategoriesWrapper>
      </Container>
    )
  }
}

export default CategoryList
