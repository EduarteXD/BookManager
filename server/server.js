const express = require('express')
const graphQL = require('express-graphql').graphqlHTTP

const app = express()

app.use('/graphql', graphQL({
    graphiql: true
}))

app.listen(1333, () => {
    console.log('server is running at *:1333')
})