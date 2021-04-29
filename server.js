// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a schema

const schema = buildSchema(`
type About {
    message: String!
}

type Mutation {
    addBook(title: String!, author: String!, genre: String!, pages:Int!): Book!
    updateBook(id: Int!, title: String, author: String, genre: String, pages: Int): Book
    deleteBook(id: Int!, title: String, author: String, genre: String, pages: Int): Book!
}

enum Genres {
    SciFi
    PhilosophicalFiction
    DystopianFiction
    HorrorFiction
}

type Book {
    title: String!
    author: String!
    genre: Genres!
    pages: Int!
}

type Time {
  hour: Int!
  minute: Int!
  second: Int!
}

type Roll {
  total: Int!
  sides: Int!
  rolls: [Int!]!
}

type Query {
    getAbout: About
      getBook(id: Int!): Book
      allBooks: [Book!]!
      firstBook: Book!
      lastBook: Book!
      getTime: Time!
      getRandom(range: Int!): Int!
      getRoll(sides: Int!, rolls: Int!): Roll
      getBookCount: Book
      booksInRange(start: Int!, count: Int!): [Book]
      getBookByGenre(genre: String!): [Book]

  }`)

// Define a resolver
const bookList = [
  { title: 'I, Robot', author: 'Isaac Asimov', genre: 'SciFi', pages: 253 },
  { title: 'Siddhartha', author: 'Hermann Hesse', genre: 'PhilosophicalFiction', pages: 152 },
  { title: 'A Clockwork Orange', author: 'Anthony Burgess', genre: 'DystopianFiction', pages: 213 },
  { title: 'The Stand', author: 'Stephen King', genre: 'HorrorFiction', pages: 873 }
]

function randomNumber(range){
  return Math.floor(Math.random() * range)
}

const root = {
    getAbout: () => {
      return { message: "Let's read a book! Remember Books?" }
    },

    getBook: ({ id }) =>  {  
        return bookList[id]
    },
    allBooks: () => {
      return bookList
    },

    firstBook: () => {
      return bookList[id = 0]
    },

    lastBook: () => {
      return bookList[id = 3]
    },

    bookCount: () => {
      const count = bookList.length
      return { total: count}
    },

    addBook: ({ title, author, genre, pages }) => {
    const book = { title, author, genre, pages }
    bookList.push(book)
    return book
    },

    updateBook: ({ id, title, author, genre, pages }) => {
      const book = bookList[id]
      if (book === undefined) {
        return null
    }
    book.title = title || book.title
    book.author = author || book.author
    book.genre = genre || book.genre
    book.pages = pages || book.pages
    return book
    },

    deleteBook: ({ id }) => {
      deletedBook = bookList[id]
      bookList.pop(deletedBook)
      return deletedBook
    },

    getTime: () => {
      const now = new Date()
      return { hour:now.getHours(), minute:now.getMinutes(), second: now.getSeconds() }
    },

    getRandom: ({ range }) => {
      return randomNumber(range)
    },

    booksInRange: ({ start, count }) => {
    const rangedArray = []
    if ((start + count) < bookList.length) {
      const limit = start + count
      console.log('start: ', start, 'count: ', count)
      for (let i = start; i < limit; i++) {
          console.log(bookList[i])
          rangedArray.push(bookList[i])
      }
    }
    return rangedArray
    },

    getBookByGenre: ({ genre }) => {
      const genresList = []
      for (let i = 0; i < bookList.length -1; i++)
      if (bookList[i].genre === genre) {
        genresList.push(bookList[i])
        }
        return genresList
      },

    getRoll: ({ sides, rolls }) => {
      var i;
      var rollsTotal = 0
      var rollList = []
      for (i = 0; i < rolls; i++) {
        let oneRoll = (randomNumber(sides)+1);
        rollList.push(oneRoll)
        rollsTotal = rollsTotal + oneRoll
      }
        return { total: rollsTotal, sides: sides, rolls: rollList}  
      }
    }                                  

// Create an express app
const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  }))

  // Start this app
const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})


