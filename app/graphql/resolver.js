import {
    simpleQuery,
    innerJoinQuery,
} from './model'

export default {
    Query: {
        users: async ( root, args, context ) => {
            return simpleQuery( args || {}, 'user' )
        }
    },
    User: {
        tasks: async ( root, args, context ) => {
            return simpleQuery( { user_id: root.id }, 'task' )
        },
        tags: async ( root, args, context ) => {
            return simpleQuery( { user_id: root.id }, 'tag' )
        },
        goals: async ( root, args, context ) => {
            return simpleQuery( { user_id: root.id }, 'goal' )
        }    
    },
    Goal: {
        user: async ( root, args, context ) => {
            return simpleQuery( { id: root.user_id }, 'user' ).then( res =>  res !== null ? res[0] : null )
        },
        tags: async ( root, args, context ) => {
            return innerJoinQuery( { goal_id: root.id }, 'tag', 'goal_tags', 'tag_id' )            
        },
        tasks: async ( root, args, context ) => {
            return innerJoinQuery( { goal_id: root.id }, 'task', 'tasks_goals', 'task_id' )            
        }
    }, 
    Task: {
        user: async ( root, args, context ) => {
            return simpleQuery( { id: root.user_id }, 'user' ).then( res =>  res !== null ? res[0] : null )
        },
        tags: async ( root, args, context ) => {
            return innerJoinQuery( { task_id: root.id }, 'tag', 'task_tags', 'tag_id' )            
        },
        goals: async ( root, args, context ) => {
            return innerJoinQuery( { task_id: root.id }, 'goal', 'tasks_goals', 'goal_id' )            
        }
    },
    Tag: {
        user: async ( root, args, context ) => {
            return simpleQuery( { id: root.user_id }, 'user' ).then( res =>  res !== null ? res[0] : null )
        },
        tasks: async ( root, args, context ) => {
            return innerJoinQuery( { tag_id: root.id }, 'task', 'task_tags', 'task_id' )            
        },
        goals: async ( root, args, context ) => {
            return innerJoinQuery( { tag_id: root.id }, 'goal', 'goal_tags', 'goal_id' )            
        }
    }
}
