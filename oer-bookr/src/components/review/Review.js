import React from "react"

import { ReviewWrapper } from "../../styles/reviewStyles"

const Review = props => {
  return (
    <ReviewWrapper>
      <div>
        <strong>{props.rev.reviewer}</strong>
      </div>
      <div>{props.rev.review}</div>
    </ReviewWrapper>
  )
}

export default Review
