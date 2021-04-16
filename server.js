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


  type Query {
    getAbout: About
      getBook(id: Int!): Book
      allBooks: [Book!]!
    
  }`)

// Define a resolver
const bookList = [
  { title: 'Siddhartha', author: 'Hermann Hesse', genre: 'Philosophical Fiction', pages: 152 },
  { title: 'I, Robot', author: 'Isaac Asimov', genre: 'Science Fiction', pages: 253 },
  { title: 'A Clockwork Orange', author: 'Anthony Burgess', genre: 'Dystopian Fiction', pages: 213 }
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


