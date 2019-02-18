import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Zoom from "react-reveal/Zoom"
import axios from "axios"
import { Link } from "react-router-dom"

import { DescriptionWrapper } from "../styles/bookStyles"
import { ReviewsWrapper } from "../styles/reviewStyles"
import { Button, Form } from "../styles/formStyles"
import Review from "../components/review/Review"
import BackgroundImage from "../components/BackgroundImage"
import { Icon, IconGroup } from "../styles/basicStyles"

class BookDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {},
      modal: false,
      currentReview: {},
      reviewer: "",
      warning: false,
      reviewId: "",
      actionType: "",
      warningType: ""
    }
  }

  componentDidMount = () => {
    // fetch the book information and the reviews array
    const bookId = this.props.match.params.id
    this.fetchBookInfo(bookId)

    const reviewer = localStorage.getItem("currentUser")
    if (reviewer) {
      this.setState({ reviewer: reviewer })
    }
  }

  fetchBookInfo = id => {
    const bookInfoURL = `https://oer-bookr-api.herokuapp.com/books/${id}`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      axios
        .get(bookInfoURL, requestOptions)
        .then(res => {
          this.setState({ book: res.data, currentReview: {}, reviewId: "" })
        })
        .catch(err => console.log(err))
    }
  }

  setCurrentReview = event => {
    const newReview = {
      ...this.state.currentReview,
      [event.target.name]: event.target.value
    }
    this.setState({ currentReview: newReview })
  }

  toggle = () => {
    this.setState(prevState => {
      return {
        modal: !prevState.modal,
        text: "",
        actionType: "Add"
      }
    })
  }

  toggleWarning = (type, id) => {
    this.setState(prevState => {
      return {
        warning: !prevState.warning,
        reviewId: id,
        warningType: type
      }
    })
  }

  toggleEdit = id => {
    const endpoint = `https://oer-bookr-api.herokuapp.com/reviews/${id}`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    axios
      .get(endpoint, requestOptions)
      .then(res =>
        this.setState(prevState => {
          return {
            modal: !prevState.modal,
            currentReview: res.data,
            actionType: "Edit"
          }
        })
      )
      .catch(err => console.log(err))
  }

  action = event => {
    event.preventDefault()
    this.toggle()
    if (this.state.actionType === "Add") this.addHandler()
    if (this.state.actionType === "Edit") this.editHandler()
  }

  addHandler = () => {
    const endpoint = "https://oer-bookr-api.herokuapp.com/reviews"
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    const newReview = {
      ...this.state.currentReview,
      reviewer: this.state.reviewer,
      rating: 5,
      book_id: this.state.book.id
    }
    axios
      .post(endpoint, newReview, requestOptions)
      .then(res => (newReview.id = res.data))
      .catch(err => console.log(err))

    this.fetchBookInfo(this.state.book.id)
  }

  editHandler = () => {
    const endpoint = `https://oer-bookr-api.herokuapp.com/reviews/${
      this.state.currentReview.id
    }`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    const updatedReview = {
      ...this.state.currentReview,
      review: this.state.currentReview.review.slice(),
      rating: this.state.currentReview.rating
    }
    axios
      .put(endpoint, updatedReview, requestOptions)
      .then(res => console.log("Response from edit: ", res))
      .catch(err => console.log(err))

    this.fetchBookInfo(this.state.book.id)
  }

  deleteHandler = event => {
    event.preventDefault()
    if (this.state.warningType === "review") {
      const endpoint = `https://oer-bookr-api.herokuapp.com/reviews/${
        this.state.reviewId
      }`
      const token = localStorage.getItem("jwt")
      const requestOptions = {
        headers: {
          authorization: token
        }
      }
      if (!token) this.props.history.push("/login")
      axios
        .delete(endpoint, requestOptions)
        .then(res => console.log("Response Delete: ", res))
        .catch(err => console.log(err))

      this.fetchBookInfo(this.state.book.id)
    } else if (this.state.warningType === "book") {
      this.props.deleteBook(this.state.book.id)
      this.props.history.push(`/books/category/${this.state.book.subject}`)
    }
    this.toggleWarning()
  }

  render() {
    const capitalize = str => str[0].toUpperCase() + str.slice(1)
    const sections = ["subject", "author", "publisher", "license"]
    const makeSectionDiv = section => (
      <div key={section}>
        <span>{capitalize(section)}:</span> {this.state.book[section]}
      </div>
    )
    return (
      <div>
        <BackgroundImage />
        <Zoom>
          <DescriptionWrapper>
            <IconGroup>
              <Icon show>
                <i
                  className="fas fa-minus-circle"
                  onClick={() => this.toggleWarning("book")}
                />
              </Icon>
              <Icon show>
                <Link to={`/books/update/${this.state.book.id}`}>
                  <i className="far fa-edit" />
                </Link>
              </Icon>
            </IconGroup>
            <h1>{this.state.book.title}</h1>
            <div>
              <div>{sections.map(makeSectionDiv)}</div>
              <Button color="primary" onClick={this.toggle}>
                Add Review
              </Button>
            </div>
            <hr />
            <h3>Reviews:</h3>
            <ReviewsWrapper>
              {this.state.book.reviews
                ? this.state.book.reviews.map(r => (
                    <Review
                      review={r}
                      key={r.id}
                      toggleWarning={this.toggleWarning}
                      toggleEdit={this.toggleEdit}
                    />
                  ))
                : null}
            </ReviewsWrapper>
          </DescriptionWrapper>
        </Zoom>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
          <ModalHeader toggle={this.toggle}>
            {this.state.actionType} Review
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.action}>
              <div>
                <h3>Reviewer: {this.state.reviewer}</h3>
              </div>
              <div>
                <textarea
                  rows="4"
                  cols="25"
                  name="review"
                  placeholder="Leave your comment"
                  onChange={this.setCurrentReview}
                  value={this.state.currentReview.review}
                />
              </div>
              <Button type="submit" color="secondary">
                {this.state.actionType} Review
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.warning}
          toggle={this.toggleWarning}
          centered
          size="sm"
        >
          <ModalBody>
            <Form onSubmit={this.deleteHandler}>
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
      </div>
    )
  }
}

export default BookDescription
