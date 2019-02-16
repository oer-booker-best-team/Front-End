import React, { Component } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import Zoom from "react-reveal/Zoom"

import Authenticate from "../hoc/Authenticate"
import { DescriptionWrapper } from "../styles/bookStyles"
import { ReviewsWrapper } from "../styles/reviewStyles"
import { Button, Form } from "../styles/formStyles"
import Review from "../components/review/Review"
import BackgroundImage from "../components/BackgroundImage"

class BookDescription extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: "Engineering",
      title: "About Accuracy and Approximation",
      author: "Ronald Poveda",
      description:
        "Students learn about the concepts of accuracy and approximation as they pertain to robotics, gain insight into experimental accuracy, and learn how and when to estimate values that they measure. Students also explore sources of error stemming from the robot setup and rounding numbers.",
      publisher: "TeachEngineering",
      license: "",
      reviews: [
        {
          id: 0,
          reviewer: "Anonymous",
          text:
            "Students follow specific procedures to complete much of the work. Using this as an assessment may yield faulty information."
        },
        {
          id: 1,
          reviewer: "L.J",
          text:
            "Worksheets and support tell student the procedure to complete the work."
        }
      ],
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

    const reviewer = localStorage.getItem("currentUser")
    if (reviewer) {
      this.setState({ reviewer: reviewer })
    }
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
    const review = this.state.reviews.filter(review => review.id === id)
    this.setState(prevState => {
      return {
        modal: !prevState.modal,
        text: review[0].text,
        reviewer: review[0].reviewer,
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
    const newReview = {
      reviewer: this.state.reviewer.slice(),
      text: this.state.text.slice(),
      id: new Date()
    }
    // make a put request to add the review - update book with new reviews array
    const reviews = [...this.state.reviews]
    reviews.push(newReview)
    this.setState({ reviews: reviews, text: "" })
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
    const sections = ["category", "author", "publisher", "license"]
    const makeSectionDiv = section => (
      <div key={section}>
        <span>{capitalize(section)}:</span> {this.state[section]}
      </div>
    )
    return (
      <div>
        <BackgroundImage />
        <Zoom>
          <DescriptionWrapper>
            <h1>{this.state.title}</h1>
            <div>
              <h2>Description: </h2>
              <p>{this.state.description}</p>
            </div>
            <div>
              <div>{sections.map(makeSectionDiv)}</div>
              <Button color="primary" onClick={this.toggle}>
                Add Review
              </Button>
            </div>
            <hr />
            <h3>Reviews:</h3>
            <ReviewsWrapper>
              {this.state.reviews.map(r => (
                <Review
                  review={r}
                  key={r.id}
                  toggle={this.toggleWarning}
                  toggleEdit={this.toggleEdit}
                />
              ))}
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

export default Authenticate(BookDescription)
