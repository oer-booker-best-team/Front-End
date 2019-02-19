import React from "react"
import { Link } from "react-router-dom"
import Zoom from "react-reveal/Zoom"
import { Modal, ModalBody } from "reactstrap"

import { BookWrapper, BookInfo } from "../../styles/bookStyles"
import { Icon, IconGroup } from "../../styles/basicStyles"
import { Button, Form } from "../../styles/formStyles"

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
          </BookInfo>
          <IconGroup>
            <Icon show>
              <i className="fas fa-minus-circle" onClick={this.toggleWarning} />
            </Icon>
            <Icon show>
              <Link to={`/books/update/${this.props.book.id}`}>
                <i className="far fa-edit" />
              </Link>
            </Icon>
          </IconGroup>
        </BookWrapper>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleWarning}
          centered
          size="sm"
        >
          <ModalBody>
            <Form
              onSubmit={event => {
                event.preventDefault()
                this.props.deleteBook(this.props.book.id)
              }}
            >
              <Button type="submit" color="danger">
                Delete
              </Button>
              <Button
                type="button"
                color="secondary"
                onClick={this.toggleWarning}
              >
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

export default Book
