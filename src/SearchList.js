import React from 'react'
import PropTypes from 'prop-types'
import BooksComponent from './BooksComponent'
import { Link } from 'react-router-dom'

class SearchList extends React.Component {
  static propTypes = {
    searchBooks: PropTypes.array.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    addMethod: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.props.onQueryChange(query.trim())
  }

  render() {
    const {searchBooks, addMethod} = this.props
    const {query} = this.state
    return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
           NOTES: The search from BooksAPI is limited to a particular set of search terms.
           You can find these search terms here:
           https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

           However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
           you don't find a specific author or title. Every search is limited by search terms.
           */}
          <input type="text"
                 value={query}
                 onChange={event => this.updateQuery(event.target.value)}
                 placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
        <BooksComponent books={searchBooks} addMethod={addMethod}/>
      </div>
    </div>
    )
  }

}

export default SearchList