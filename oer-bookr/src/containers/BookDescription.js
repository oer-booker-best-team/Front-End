import React, { Component } from "react"
import Zoom from "react-reveal/Zoom"
import axios from "axios"
import { Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"

import { DescriptionWrapper, BookHeader } from "../styles/bookStyles"
import { ReviewsWrapper } from "../styles/reviewStyles"
import { Button, Message } from "../styles/formStyles"
import Review from "../components/review/Review"
import BackgroundImage from "../components/BackgroundImage"
import { Icon, IconGroup, Loading } from "../styles/basicStyles"
import Warning from "../components/modals/Warning"
import ReviewModal from "../components/modals/Modal"

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
            error: ""
          })
        })
        .catch(
          this.setState({ error: "Error fetching book info!", loading: false })
        )
    }
  }

  toggle = () => {
    this.setState(prevState => {
      return {
        modal: !prevState.modal,
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
      .then(res => {
        this.setState(prevState => {
          return {
            modal: !prevState.modal,
            currentReview: res.data,
            actionType: "Edit",
            error: "",
            loading: false
          }
        })
      })
      .catch(err =>
        this.setState({ error: "Error fetching review info!", loading: false })
      )
  }

  setCurrentReview = event => {
    const newReview = {
      ...this.state.currentReview
    }
    if (event.target.name === "rating")
      newReview.rating = Number(event.target.value)
    else newReview[event.target.name] = event.target.value
    this.setState({ currentReview: newReview })
  }

  action = (event, review) => {
    event.preventDefault()
    this.toggle()
    this.setState({ currentReview: review })
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

        <ReviewModal
          open={this.state.modal}
          toggle={this.toggle}
          action={this.action}
          actionType={this.state.actionType}
          reviewer={this.state.reviewer}
          review={{ ...this.state.currentReview }}
          saveInput={this.setCurrentReview}
        />

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
