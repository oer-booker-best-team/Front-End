import React from "react"

import { ReviewWrapper } from "../../styles/reviewStyles"
import { Icon } from "../../styles/basicStyles"

const Review = ({ review, toggle }) => {
  const currentUser = localStorage.getItem("currentUser")
  let canDelete = false
  if (currentUser === review.reviewer) canDelete = true
  return (
    <ReviewWrapper>
      <div>
        <p>
          <strong>{review.reviewer}</strong>
        </p>
        <p>{review.text}</p>
      </div>
      <Icon show={canDelete}>
        <i className="fas fa-minus-circle" onClick={() => toggle(review.id)} />
      </Icon>
    </ReviewWrapper>
  )
}

export default Review
