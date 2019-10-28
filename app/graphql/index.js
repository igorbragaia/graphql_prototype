import { makeExecutableSchema } from 'graphql-tools'
import express_graphql from 'express-graphql'
import resolver from './resolver'

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

const resolvers = {
    Query: {
        users: resolver.Query.users,
        newUser: resolver.Query.newUser,
    },
    User: {
        tasks: resolver.User.tasks,
        tags: resolver.User.tags,
        goals: resolver.User.goals,
        newTask: resolver.User.newTask,
        newGoal: resolver.User.newGoal,
        newTag: resolver.User.newTag,
    },
    Goal: {
        user: resolver.Goal.user,
        tags: resolver.Goal.tags,
        tasks: resolver.Goal.tasks,
        relateTask: resolver.Goal.relateTask,
        relateTag: resolver.Goal.relateTag,
    }, 
    Task: {
        user: resolver.Task.user,
        tags: resolver.Task.tags,
        goals: resolver.Task.goals,
        relateTag: resolver.Task.relateTag,
        relateGoal: resolver.Task.relateGoal,
    },
    Tag: {
        user: resolver.Tag.user,
        tasks: resolver.Tag.tasks,
        goals: resolver.Tag.goals,
    }
}

export default express_graphql({
    schema: makeExecutableSchema({
        typeDefs,
        resolvers,
    }),
    graphiql: true
})
