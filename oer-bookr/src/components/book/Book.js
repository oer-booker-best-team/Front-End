import React from "react"
import { Link } from "react-router-dom"
import Zoom from "react-reveal/Zoom"
import PropTypes from "prop-types"

import { BookWrapper, BookInfo } from "../../styles/bookStyles"
import { Icon, IconGroup } from "../../styles/basicStyles"
import Warning from "../modals/Warning"

class Book extends React.Component {
  state = {
    modal: false
  }

  toggleWarning = () => {
    this.setState(prevState => {
      return {
        modal: !prevState.modal
      }
    })
  }

  render() {
    const capitalize = str => str[0].toUpperCase() + str.slice(1)
    const sections = ["subject", "author", "publisher", "license"]
    const makeSectionDiv = section => (
      <div key={section}>
        <span>{capitalize(section)}:</span> {this.props.book[section]}
      </div>
    )
    return (
      <>
        <BookWrapper>
          <Zoom>
            <img src={this.props.book.image} alt="Book" />
          </Zoom>
          <BookInfo>
            <div>
              <span>Title:</span>
              <Link to={`/books/${this.props.book.id}`}>
                {this.props.book.title}
              </Link>
            </div>
            {sections.map(makeSectionDiv)}
            <div>
              <span>Link:</span>
              <a
                href={this.props.book.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.book.link}
              </a>
            </div>
          </BookInfo>
          {this.props.book.adder === localStorage.getItem("currentUser") ? (
            <IconGroup>
              <Icon show>
                <i
                  className="fas fa-minus-circle"
                  onClick={this.toggleWarning}
                />
              </Icon>
              <Icon show>
                <Link to={`/books/update/${this.props.book.id}`}>
                  <i className="far fa-edit" />
                </Link>
              </Icon>
            </IconGroup>
          ) : null}
        </BookWrapper>

        <Warning
          open={this.state.modal}
          toggle={this.toggleWarning}
          action={event => {
            event.preventDefault()
            this.props.deleteBook(this.props.book.id)
          }}
        />
      </>
    )
  }
}

export default Book

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    license: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    image: PropTypes.string,
    link: PropTypes.string,
    deleteBook: PropTypes.func
  })
}
