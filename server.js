// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a schema

const schema = buildSchema(`
type About {
    message: String!
}

type Book {
    title: String!
    author: String!
    genre: String!
    pages: Int!
}

type Time {
  hour: Int!
  minute: Int!
  second: Int!
}

type Query {
    getAbout: About
      getBook(id: Int!): Book
      allBooks: [Book!]!
      firstBook: Book!
      lastBook: Book!
      getTime: Time!
      getRandom(range: Int!): Int!
  }`)

// Define a resolver
const bookList = [
  { title: 'I, Robot', author: 'Isaac Asimov', genre: 'Science Fiction', pages: 253 },
  { title: 'Siddhartha', author: 'Hermann Hesse', genre: 'Philosophical Fiction', pages: 152 },
  { title: 'A Clockwork Orange', author: 'Anthony Burgess', genre: 'Dystopian Fiction', pages: 213 },
  { title: 'The Stand', author: 'Stephen King', genre: 'Horror Fiction', pages: 873 }
]

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
    getTime: () => {
      const now = new Date()
      return { hour:now.getHours(), minute:now.getMinutes(), second: now.getSeconds() }
    },
    getRandom: () => {
      const num = Math.floor(Math.random() * 100) + 1 
      return num
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


