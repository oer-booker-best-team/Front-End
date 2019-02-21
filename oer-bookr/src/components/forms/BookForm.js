import React, { Component } from "react"
import Zoom from "react-reveal/Zoom"
import axios from "axios"
import { ClipLoader } from "react-spinners"

import { Button, Message, Row } from "../../styles/formStyles"
import { AddForm } from "../../styles/addFormStyles"
import BackgroundImage from "../BackgroundImage"
import bookImage from "../../assets/images/bookcase.jpg"
import { Loading } from "../../styles/basicStyles"

class BookForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookInfo: {
        title: "",
        author: "",
        publisher: "",
        license: "",
        subject: "",
        image: bookImage,
        link: "",
        user_id: undefined
      },
      error: "",
      loading: false
    }
  }

  componentDidMount = () => {
    const token = localStorage.getItem("jwt")
    const requestOptions = {
      headers: {
        authorization: token
      }
    }
    if (!token) this.props.history.push("/login")
    else {
      if (this.props.type === "Update") {
        const getBookInfoUrl = `https://open-source-edu-books.herokuapp.com/books/${
          this.props.match.params.id
        }`
        this.setState({ loading: true })
        axios
          .get(getBookInfoUrl, requestOptions)
          .then(res => {
            const currentInfo = { ...res.data }
            delete currentInfo.id
            delete currentInfo.reviews
            delete currentInfo.adder
            this.setState({ bookInfo: currentInfo, error: "", loading: false })
          })
          .catch(err =>
            this.setState({
              error: "Error fetching book info!",
              loading: false
            })
          )
      } else {
        const reset = {
          title: "",
          author: "",
          publisher: "",
          license: "",
          subject: "",
          image: bookImage,
          link: ""
        }
        this.setState({ bookInfo: reset })
      }
    }
  }

  saveInput = event => {
    const newInfo = {
      ...this.state.bookInfo,
      [event.target.name]: event.target.value
    }
    this.setState({ bookInfo: newInfo })
  }

  submitHandler = event => {
    event.preventDefault()
    this.props.action(
      this.state.bookInfo,
      this.props.type,
      this.props.match.params.id
    )
  }

  render() {
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
          <AddForm onSubmit={this.submitHandler}>
            <h1>{this.props.type} A Book</h1>
            <Row>
              <input
                name="title"
                type="text"
                placeholder="---"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.bookInfo.title}
                required
              />
              <label htmlFor="title">
                <i className="fas fa-book" /> Title
              </label>
            </Row>
            <Row>
              <input
                name="author"
                type="text"
                placeholder="---"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.bookInfo.author}
                required
              />
              <label htmlFor="author">
                <i className="fas fa-user" /> Author
              </label>
            </Row>
            <Row>
              <input
                name="publisher"
                type="text"
                placeholder="---"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.bookInfo.publisher}
                required
              />
              <label htmlFor="publisher">
                <i className="fas fa-user" /> Publisher
              </label>
            </Row>
            <Row>
              <input
                name="license"
                type="text"
                placeholder="---"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.bookInfo.license}
                required
              />
              <label htmlFor="license">
                <i className="fas fa-scroll" /> License
              </label>
            </Row>
            <Row>
              <select
                name="subject"
                required
                onChange={this.saveInput}
                value={this.state.bookInfo.subject}
              >
                <option value="" disabled selected>
                  Subject
                </option>
                <option value="History">History</option>
                <option value="Math">Math</option>
                <option value="Arts">Arts</option>
                <option value="Education">Education</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Business">Business</option>
              </select>
            </Row>
            <Row>
              <input
                name="image"
                type="text"
                placeholder="---"
                autocomplete="off"
                onChange={this.saveInput}
                value={
                  this.state.bookInfo.image ===
                  "/static/media/bookcase.008fbbb5.jpg"
                    ? ""
                    : this.state.bookInfo.image
                }
              />
              <label htmlFor="image">
                <i className="fas fa-image" /> Image
              </label>
            </Row>
            <Row>
              <input
                name="link"
                type="text"
                placeholder="---"
                autocomplete="off"
                onChange={this.saveInput}
                value={this.state.bookInfo.link}
              />
              <label htmlFor="link">
                <i className="fas fa-link" /> Link
              </label>
            </Row>
            <Button color="primary">{this.props.type} Book</Button>
          </AddForm>
        </Zoom>
      </div>
    )
  }
}

export default BookForm
