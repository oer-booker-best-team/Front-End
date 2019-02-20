import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Zoom from "react-reveal/Zoom"
import axios from "axios"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { DescriptionWrapper, BookHeader } from "../styles/bookStyles"
import { ReviewsWrapper } from "../styles/reviewStyles"
import { Button, Form, Message } from "../styles/formStyles"
import Review from "../components/review/Review"
import BackgroundImage from "../components/BackgroundImage"
import { Icon, IconGroup, Loading } from "../styles/basicStyles"
import StarReview from "../components/review/StarReview"
import Warning from "../components/modals/Warning"

class BookDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: {},
      modal: false,
      currentReview: {
        review: "",
        rating: 5,
        reviewer: ""
      },
      reviewer: "",
      warning: false,
      reviewId: "",
      actionType: "",
      warningType: "",
      error: "",
      loading: false
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
    const bookInfoURL = `https://open-source-edu-books.herokuapp.com/books/${id}`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      this.setState({ loading: true, error: "" })
      axios
        .get(bookInfoURL, requestOptions)
        .then(res => {
          this.setState({
            book: res.data,
            currentReview: {},
            reviewId: "",
            actionType: "",
            warningType: "",
            error: "",
            loading: false
          })
        })
        .catch(
          this.setState({ error: "Error fetching book info!", loading: false })
        )
    }
  }

  setCurrentReview = event => {
    const newReview = {
      ...this.state.currentReview,
      [event.target.name]: event.target.value
    }
    if (event.target.name === "rating")
      newReview.rating = Number(event.target.value)
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
    const endpoint = `https://open-source-edu-books.herokuapp.com/reviews/${id}`
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    this.setState({ loading: true })
    axios
      .get(endpoint, requestOptions)
      .then(res =>
        this.setState(prevState => {
          return {
            modal: !prevState.modal,
            currentReview: res.data,
            actionType: "Edit",
            error: "",
            loading: false
          }
        })
      )
      .catch(err =>
        this.setState({ error: "Error fetching review info!", loading: false })
      )
  }

  action = event => {
    event.preventDefault()
    this.toggle()
    if (this.state.actionType === "Add") this.addHandler()
    if (this.state.actionType === "Edit") this.editHandler()
  }

  addHandler = () => {
    const endpoint = "https://open-source-edu-books.herokuapp.com/reviews"
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
      book_id: this.state.book.id
    }
    if (!newReview.rating) newReview.rating = 5
    this.setState({ loading: true })
    axios
      .post(endpoint, newReview, requestOptions)
      .then(res => {
        this.setState({ error: "", loading: false })
        newReview.id = res.data
        this.fetchBookInfo(this.state.book.id)
      })
      .catch(err =>
        this.setState({ error: "Error adding review!", loading: false })
      )
  }

  editHandler = () => {
    const endpoint = `https://open-source-edu-books.herokuapp.com/reviews/${
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
    this.setState({ loading: true })
    axios
      .put(endpoint, updatedReview, requestOptions)
      .then(res => {
        this.setState({ error: "", loading: false })
        this.fetchBookInfo(this.state.book.id)
      })
      .catch(err =>
        this.setState({ error: "Error editing review!", loading: false })
      )
  }

  deleteHandler = event => {
    event.preventDefault()
    if (this.state.warningType === "review") {
      const endpoint = `https://open-source-edu-books.herokuapp.com/reviews/${
        this.state.reviewId
      }`
      const token = localStorage.getItem("jwt")
      const requestOptions = {
        headers: {
          authorization: token
        }
      }
      if (!token) this.props.history.push("/login")
      this.setState({ loading: true })
      axios
        .delete(endpoint, requestOptions)
        .then(res => {
          this.setState({ error: "", loading: false })
          this.fetchBookInfo(this.state.book.id)
          this.toggleWarning()
        })
        .catch(err =>
          this.setState({ error: "Error deleting review!", loading: false })
        )
    } else if (this.state.warningType === "book") {
      this.props.deleteBook(this.state.book.id)
      this.props.history.push(`/books/category/${this.state.book.subject}`)
    }
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
        {this.state.error ? (
          <Message error>
            <h2>{this.state.error}</h2>
          </Message>
        ) : null}
        <Loading>
          <ClipLoader
            size={150}
            color={"#BC1102"}
            loading={this.state.loading}
          />
        </Loading>
        <Zoom>
          <DescriptionWrapper>
            {this.state.book.adder === localStorage.getItem("currentUser") ? (
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
            ) : null}
            <BookHeader>
              <h1>{this.state.book.title}</h1>
              <img src={this.state.book.image} alt="Book Cover" />
            </BookHeader>
            <div>
              <div>{sections.map(makeSectionDiv)}</div>
              <div>
                <span>Link:</span>{" "}
                <a
                  href="{this.state.book.link}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.book.link}
                </a>
              </div>
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
                <StarReview setRating={this.setCurrentReview} />
              </div>
              <div>
                <textarea
                  rows="4"
                  cols="25"
                  name="review"
                  placeholder="Leave your comment"
                  onChange={this.setCurrentReview}
                  value={this.state.currentReview.review}
                  required
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

        <Warning
          open={this.state.warning}
          toggle={this.toggleWarning}
          action={this.deleteHandler}
        />
      </div>
    )
  }
}

export default BookDescription
