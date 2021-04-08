// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create a schema

const schema = buildSchema(`
type Meal {
    description: String!
}

type Query {
  getAbout: About
  getMeal(time: String!): Meal
}`)

// Define a resolver

const root = {
    getAbout: () => {
      return { message: 'Im Hungry' }
    },
        getmeal: () => {
            return { description: 'Noodles w/ Sa                                                                                                                                                                                                                                                                                                                                          wce' }
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
