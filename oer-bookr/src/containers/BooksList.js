import React, { Component } from "react"

class BooksList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <h1>
        Welcome to the list of books for category {this.props.match.params.id}
      </h1>
    )
  }
}

export default BooksList
