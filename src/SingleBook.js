import React from 'react'
import PropTypes from 'prop-types'
import ShelfStatus from './utils/ShelfStatus'
import * as BooksAPI from './BooksAPI'

class SingleBook extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateMethod: PropTypes.func,
    addMethod: PropTypes.func
  }

  state = {
    shelf: this.props.book.shelf
  }


  handleChange = (event, book) => {
    const eventValue = event.target.value
    BooksAPI.update(this.props.book, eventValue)

    this.setState(state => ({
      //setState is using synthetic event, so calling event.target.value inside setState will not work
      shelf: eventValue
    }))
    if (this.props.updateMethod) {
      this.props.updateMethod(book, eventValue)
    }
    if (this.props.addMethod) {
      this.props.addMethod(book)
    }
  }

  render() {
    const {book} = this.props
    let author = book.authors ? book.authors[0] : null

    return (
     <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(e) => this.handleChange(e, book)}>
              <option value='none' disabled>Move To...</option>
              <option value={ShelfStatus.CURRENTLY_READING}>Currently Reading</option>
              <option value={ShelfStatus.WANT_TO_READ}>Want To Read</option>
              <option value={ShelfStatus.READ}>Read</option>
              <option value={ShelfStatus.NONE}>None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {/*TODO, show all authors*/}
        <div className="book-authors">{author}</div>
     </div>
    )
  }
}

export default SingleBook
