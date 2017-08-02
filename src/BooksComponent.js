import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import SingleBook from './SingleBook'

class BooksComponent extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string,
    updateMethod: PropTypes.func,
    addMethod: PropTypes.func
  }

  render() {
    const {shelf, books, updateMethod, addMethod} = this.props
    let filteredBooks
    filteredBooks = !shelf ? books : books.filter(book => book.shelf === shelf).sort(sortBy('title'))

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              filteredBooks.map(book => (
              <li key={book.id}>
                <SingleBook book={book} updateMethod={updateMethod} addMethod={addMethod}/>
              </li>
             ))}
           </ol>
        </div>
      </div>
    )
  }
}

export default BooksComponent
