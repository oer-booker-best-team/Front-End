import React, { Component } from "react"

import { DescriptionWrapper } from "../styles/bookStyles"
import { ReviewsWrapper } from "../styles/reviewStyles"
import Review from "../components/review/Review"

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
          review:
            "Students follow specific procedures to complete much of the work. Using this as an assessment may yield faulty information."
        },
        {
          id: 1,
          reviewer: "L.J",
          review:
            "Worksheets and support tell student the procedure to complete the work."
        }
      ]
    }
  }
  render() {
    const capitalize = str => str[0].toUpperCase() + str.slice(1)
    const sections = ["category", "author", "publisher", "license"]
    const makeSectionDiv = section => (
      <div>
        <span>{capitalize(section)}:</span> {this.state[section]}
      </div>
    )
    return (
      <DescriptionWrapper>
        <h1>
          {this.state.title} - id: {this.props.match.params.id}
        </h1>
        <p>
          <h2>Description: </h2>
          {this.state.description}
        </p>
        <div>{sections.map(makeSectionDiv)}</div>
        <hr />
        <h3>Reviews:</h3>
        <ReviewsWrapper>
          {this.state.reviews.map(review => (
            <Review rev={review} key={review.id} />
          ))}
        </ReviewsWrapper>
      </DescriptionWrapper>
    )
  }
}

export default BookDescription
