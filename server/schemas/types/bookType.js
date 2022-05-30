const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql')

const bookType = new GraphQLObjectType({
    name: 'books',
    description: 'This represents a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        isbn: { type: GraphQLNonNull(GraphQLString) },
        authors: {
            type: authorType,
            resolve: (bookid) => {
                
            }
        }
    })
})

export default bookType