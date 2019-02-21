import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import { Button, Form } from "../../styles/formStyles"
import StarReview from "../review/StarReview"

const ReviewModal = props => {
  const {
    open,
    toggle,
    action,
    actionType,
    reviewer,
    saveInput,
    review
  } = props
  return (
    <Modal isOpen={open} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{actionType} Review</ModalHeader>
      <ModalBody>
        <Form onSubmit={action}>
          <div>
            <h3>Reviewer: {reviewer}</h3>
          </div>
          <div>
            <StarReview setRating={saveInput} />
          </div>
          <div>
            <textarea
              rows="4"
              cols="25"
              name="review"
              placeholder="Leave your comment"
              onChange={saveInput}
              value={review.review}
              required
            />
          </div>
          <Button type="submit" color="secondary">
            {actionType} Review
          </Button>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ReviewModal
