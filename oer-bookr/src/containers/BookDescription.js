import React, { Component } from "react"

class BookDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const style = { marginTop: "100px" }
    return (
      <h1 style={style}>
        Description for the book with id: {this.props.match.params.id}
      </h1>
    )
  }
}

export default BookDescription
