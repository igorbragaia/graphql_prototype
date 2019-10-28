import { makeExecutableSchema } from 'graphql-tools'
import express_graphql from 'express-graphql'
import resolvers from './resolvers'

const typeDefs = `
    type Query {
        users(id: Int): [User],
        newUser(
            email: String!,
            password: String!,
            username: String!
        ): User
    },
    type User {
        id: Int,
        username: String,
        password: String,
        email: String,
        newTask (
            name: String!,
            description: String,
            date: String!,
            state: String!
        ): Task,
        newGoal (
            name: String!,
            description: String
        ): Goal,
        newTag (
            name: String!
        ): Tag,
        tasks (
            id: Int
        ): [Task],
        goals (
            id: Int
        ): [Goal],
        tags (
            id: Int
        ): [Tag]
    },
    type Goal {
        id: Int,
        name: String,
        description: String,
        relateTag (
            tag_id: Int!
        ): Boolean,
        relateTask (
            task_id: Int!
        ): Boolean,
        user: User,
        tags: [Tag],
        tasks: [Task]
    },
    type Task {
        id: Int,
        name: String,
        description: String,
        date: String,
        state: String,
        relateTag (
            tag_id: Int!
        ): Boolean,
        relateGoal (
            goal_id: Int!
        ): Boolean,
        user: User,
        tags: [Tag],
        goals: [Goal]
    },
    type Tag {
        id: Int,
        name: String,
        user: User,
        tasks: [Task],
        goals: [Goal]
    }
`

export default express_graphql({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
    graphiql: true
})
