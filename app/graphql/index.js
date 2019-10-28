import { makeExecutableSchema } from 'graphql-tools'
import { loadSchemaFiles } from 'graphql-toolkit';
import express_graphql from 'express-graphql'
import resolvers from './resolvers'

const typeDefs = loadSchemaFiles(__dirname + '/schema/')

export default express_graphql({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
    graphiql: true
})
