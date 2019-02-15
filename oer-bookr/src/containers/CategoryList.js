import React, { Component } from "react"

import Category from "../components/category/Category"
import { Container, Header } from "../styles/basicStyles"
import { CategoriesWrapper } from "../styles/categoryStyles"
import BackgroundImage from "../components/BackgroundImage"
import { categories } from "../dummy-data"

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

    //Get the list of categories from server
    // const endpoint = `${process.env.REACT_APP_URL}/books`
    // const token = localStorage.getItem('jwt');
    // const requestOptions = {
    //   headers: {
    //     authorization: token
    //   }
    // }
    // axios
    //   .get(endpoint, requestOptions)
    //   .then(res => {
    //     const categories = res.data.map(book => book.category)
    //     categories = categories.filter((elem, pos, arr) => {
    //       return arr.indexOf(elem) == pos
    //     })
    //   })
    //   .catch(err => console.log("Error fetching books!", err))
    //   this.setState({categories: categories});
  }

  fetchBooks = category => {
    this.props.history.push(`/category/${category}`)
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
                key={category.name}
              />
            ))}
          </CategoriesWrapper>
        </Container>
      </>
    )
  }
}

export default CategoryList
