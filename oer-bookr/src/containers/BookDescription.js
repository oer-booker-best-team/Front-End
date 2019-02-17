import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Zoom from "react-reveal/Zoom"
import axios from "axios"

import { DescriptionWrapper } from "../styles/bookStyles"
import { ReviewsWrapper } from "../styles/reviewStyles"
import { Button, Form } from "../styles/formStyles"
import Review from "../components/review/Review"
import BackgroundImage from "../components/BackgroundImage"

class BookDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {},
      modal: false,
      reviewer: "",
      text: "",
      warning: false,
      reviewId: "",
      actionType: ""
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
    axios
      .get(bookInfoURL, requestOptions)
      .then(res => this.setState({ book: res.data }))
      .catch(err => console.log(err))
  }

  setReview = event => {
    this.setState({ text: event.target.value })
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

  toggleWarning = id => {
    this.setState(prevState => {
      return {
        warning: !prevState.warning,
        reviewId: id
      }
    })
  }

  toggleEdit = id => {
    const review = this.state.reviews.find(review => review.id === id)
    this.setState(prevState => {
      return {
        modal: !prevState.modal,
        text: review.text,
        reviewer: review.reviewer,
        actionType: "Edit",
        reviewId: id
      }
    })
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
      reviewer: this.state.reviewer,
      review: this.state.text.slice(),
      rating: 3,
      book_id: this.state.book.id
      // id: new Date()
    }
    axios
      .post(endpoint, newReview, requestOptions)
      .then(res => (newReview.id = res.data))
      .catch(err => console.log(err))

    this.fetchBookInfo(this.state.book.id)
  }

  editHandler = () => {
    const reviews = [...this.state.reviews]
    const review = reviews.find(review => review.id === this.state.reviewId)
    review.text = this.state.text
    this.setState({ reviews: reviews })
  }

  deleteHandler = event => {
    event.preventDefault()
    this.toggleWarning()
    const reviews = this.state.reviews.filter(
      review => review.id !== this.state.reviewId
    )
    this.setState({ reviews: reviews })
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
                      toggle={this.toggleWarning}
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
                  name="text"
                  placeholder="Leave your comment"
                  onChange={this.setReview}
                  value={this.state.text}
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
