import {
    simpleQuery,
    innerJoinQuery,
    simpleInsertQuery,
} from './model'

export default {
    Query: {
        users: async ( root, args, context ) => {
            return simpleQuery( args || {}, 'user' )
        },
        newUser: async ( root, args, context ) => {
            return simpleInsertQuery( args, 'user' ).then( res =>  res !== null ? res[0] : null )
        }
    },
    User: {
        tasks: async ( root, args, context ) => {
            return simpleQuery( { user_id: root.id, ...args }, 'task' )
        },
        tags: async ( root, args, context ) => {
            return simpleQuery( { user_id: root.id, ...args }, 'tag' )
        },
        goals: async ( root, args, context ) => {
            return simpleQuery( { user_id: root.id, ...args }, 'goal' )
        },
        newTask: async ( root, args, context ) => {
            return simpleInsertQuery( { user_id: root.id, ...args}, 'task' ).then( res =>  res !== null ? res[0] : null )
        },
        newGoal: async ( root, args, context ) => {
            return simpleInsertQuery( { user_id: root.id, ...args}, 'goal' ).then( res =>  res !== null ? res[0] : null )
        },
        newTag: async ( root, args, context ) => {
            return simpleInsertQuery( { user_id: root.id, ...args }, 'tag' ).then( res =>  res !== null ? res[0] : null )
        }
    },
    Goal: {
        user: async ( root, args, context ) => {
            return simpleQuery( { id: root.user_id }, 'user' ).then( res =>  res !== null ? res[0] : null )
        },
        tags: async ( root, args, context ) => {
            return innerJoinQuery( { goal_id: root.id }, 'tag', 'goal_tag', 'tag_id' )            
        },
        tasks: async ( root, args, context ) => {
            return innerJoinQuery( { goal_id: root.id }, 'task', 'task_', 'task_id' )            
        },
        relateTask: async ( root, args, context ) => {
            return simpleInsertQuery( { goal_id: root.id, task_id: args.task_id }, 'task_goal' ).then( res =>  res !== null && res.length > 0 )
        },
        relateTag: async ( root, args, context ) => {
            return simpleInsertQuery( { goal_id: root.id, tag_id: args.tag_id }, 'goal_tag' ).then( res =>  res !== null && res.length > 0 )
        }
    }, 
    Task: {
        user: async ( root, args, context ) => {
            return simpleQuery( { id: root.user_id }, 'user' ).then( res =>  res !== null ? res[0] : null )
        },
        tags: async ( root, args, context ) => {
            return innerJoinQuery( { task_id: root.id }, 'tag', 'task_tag', 'tag_id' )            
        },
        goals: async ( root, args, context ) => {
            return innerJoinQuery( { task_id: root.id }, 'goal', 'task_goal', 'goal_id' )            
        },
        relateTag: async ( root, args, context ) => {
            return simpleInsertQuery( { task_id: root.id, tag_id: args.tag_id }, 'task_tag' ).then( res =>  res !== null && res.length > 0 )
        },
        relateGoal: async ( root, args, context ) => {
            return simpleInsertQuery( { task_id: root.id, goal_id: args.goal_id }, 'task_goal' ).then( res =>  res !== null && res.length > 0 )
        }
    },
    Tag: {
        user: async ( root, args, context ) => {
            return simpleQuery( { id: root.user_id }, 'user' ).then( res =>  res !== null ? res[0] : null )
        },
        tasks: async ( root, args, context ) => {
            return innerJoinQuery( { tag_id: root.id }, 'task', 'task_tag', 'task_id' )            
        },
        goals: async ( root, args, context ) => {
            return innerJoinQuery( { tag_id: root.id }, 'goal', 'goal_tag', 'goal_id' )            
        }
    }
}
