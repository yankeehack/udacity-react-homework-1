import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksComponent from './BooksComponent'
import SearchList from './SearchList'
import ShelfStatus from './utils/ShelfStatus'
import { BrowserRouter, Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
  }

  componentDidMount() {
      BooksAPI.getAll().then(books => {
        this.setState({ showSearchPage: true, books: books })
      })
  }

  handleRefresh = (book, shelf) => {
    book.shelf = shelf
    this.forceUpdate()
  }

  addBook = (book) => {
    BooksAPI.get(book.id)
    BooksAPI.getAll().then(books => {
      this.setState({ books: books })
    })
  }

  onQueryChange = (query) => {
    BooksAPI.search(query, 20).then(books => {
      this.setState({ searchBooks: books })
    })
  }


  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/search" render={() => (
            <SearchList
              searchBooks={this.state.searchBooks}
              onQueryChange={this.onQueryChange}
              addMethod={this.addBook}
            />
          )}/>

          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BooksComponent
                    books={this.state.books}
                    shelf={ShelfStatus.CURRENTLY_READING}
                    updateMethod={this.handleRefresh}
                  />
                  <BooksComponent
                    books={this.state.books}
                    shelf={ShelfStatus.WANT_TO_READ}
                    updateMethod={this.handleRefresh}
                  />
                  <BooksComponent
                    books={this.state.books}
                    shelf={ShelfStatus.READ}
                    updateMethod={this.handleRefresh}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
