import React from "react"

import { ReviewWrapper } from "../../styles/reviewStyles"
import { Icon, IconGroup } from "../../styles/basicStyles"

const Review = ({ review, toggle, toggleEdit }) => {
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
      <IconGroup>
        <Icon show={canDelete}>
          <i
            className="fas fa-minus-circle"
            onClick={() => toggle(review.id)}
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
