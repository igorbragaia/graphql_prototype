import { makeExecutableSchema } from 'graphql-tools'
import express_graphql from 'express-graphql'
import resolver from './resolver'

const typeDefs = `
    scalar JSONObject

    type Query {
        users(id: Int): [User],
    },
    type User {
        id: Int,
        username: String!,
        password: String!,
        email: String!,
        tasks: [Task],
        goals: [Goal],
        tags: [Tag]
    },
    type Goal {
        id: Int,
        name: String!,
        description: String,
        user_id: Int!,
        user: User,
        tags: [Tag],
        tasks: [Task]
    },
    type Task {
        id: Int,
        name: String!,
        description: String,
        date: String!,
        state: String!,
        user_id: Int,
        user: User,
        tags: [Tag],
        goals: [Goal]
    },
    type Tag {
        id: Int,
        name: String!,
        user: User,
        tasks: [Task],
        goals: [Goal]
    },
`

const resolvers = {
    Query: {
        users: resolver.Query.users
    },
    User: {
        tasks: resolver.User.tasks,
        tags: resolver.User.tags,
        goals: resolver.User.goals
    },
    Goal: {
        user: resolver.Goal.user,
        tags: resolver.Goal.tags,
        tasks: resolver.Goal.tasks,
    }, 
    Task: {
        user: resolver.Task.user,
        tags: resolver.Task.tags,
        goals: resolver.Task.goals
    },
    Tag: {
        user: resolver.Tag.user,
        tasks: resolver.Tag.tasks,
        goals: resolver.Tag.goals
    }
}

export default express_graphql({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
    graphiql: true
})
