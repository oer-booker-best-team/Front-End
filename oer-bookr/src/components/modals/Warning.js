import React from "react"
import { Modal, ModalBody } from "reactstrap"

import { Button, Form } from "../../styles/formStyles"

const Warning = ({ open, toggle, action }) => {
  return (
    <Modal isOpen={open} toggle={toggle} centered size="sm">
      <ModalBody>
        <Form onSubmit={action}>
          <Button type="submit" color="danger">
            Delete
          </Button>
          <Button type="button" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default Warning
