import React from "react"
import PropTypes from "prop-types"

import { ReviewWrapper } from "../../styles/reviewStyles"
import { Icon, IconGroup } from "../../styles/basicStyles"

const Review = ({ review, toggleWarning, toggleEdit }) => {
  const currentUser = localStorage.getItem("currentUser")
  let canDelete = false
  if (currentUser === review.reviewer) canDelete = true
  const stars = []
  for (let i = 0; i < Math.floor(review.rating); i++) {
    stars.push(<i className="fas fa-star" />)
  }
  if (!Number.isInteger(review.rating))
    stars.push(<i className="fas fa-star-half-alt" />)
  return (
    <ReviewWrapper>
      <div>
        <p>
          <strong>{review.reviewer}</strong>
        </p>
        <p>
          <strong>Rating: </strong>
          {stars}
        </p>
        <p>{review.review}</p>
      </div>
      <IconGroup>
        <Icon show={canDelete}>
          <i
            className="fas fa-minus-circle"
            onClick={() => toggleWarning("review", review.id)}
          />
        </Icon>
        <Icon show={canDelete}>
          <i className="far fa-edit" onClick={() => toggleEdit(review.id)} />
        </Icon>
      </IconGroup>
    </ReviewWrapper>
  )
}

export default Review

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    book_id: PropTypes.number,
    reviewer: PropTypes.string,
    review: PropTypes.string,
    rating: PropTypes.number
  })
}
