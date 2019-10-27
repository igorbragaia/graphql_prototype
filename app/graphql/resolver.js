import {
    user_data, 
    tasks_data, 
    tags_data, 
    goals_data, 
    goals_data_from_task, 
    tags_data_from_task,
    tasks_data_from_goal,
    tags_data_from_goal,
    tasks_data_from_tag,
    goals_data_from_tag
} from './model'

export default {
    Query: {
        users: async ( root, args, context ) => {
            return await user_data(args || {})
        }
    },
    User: {
        tasks: async ( root, args, context ) => {
            return await tasks_data({ user_id: root.id })
        },
        tags: async ( root, args, context ) => {
            return await tags_data({ user_id: root.id })
        },
        goals: async ( root, args, context ) => {
            return await goals_data({ user_id: root.id })
        }    
    },
    Goal: {
        user: async ( root, args, context ) => {
            return await user_data({ id: root.user_id }).then( res =>  res !== null ? res[0] : null )
        },
        tags: async ( root, args, context ) => {
            return await tags_data_from_goal({ goal_id: root.id })            
        },
        tasks: async ( root, args, context ) => {
            return await tasks_data_from_goal({ goal_id: root.id })
        }
    }, 
    Task: {
        user: async ( root, args, context ) => {
            return await user_data({ id: root.user_id }).then( res =>  res !== null ? res[0] : null )
        },
        tags: async ( root, args, context ) => {
            return await tags_data_from_task({ task_id: root.id })            
        },
        goals: async ( root, args, context ) => {
            return await goals_data_from_task({ task_id: root.id })
        },
    },
    Tag: {
        user: async ( root, args, context ) => {
            return await user_data({ id: root.user_id }).then( res =>  res !== null ? res[0] : null )
        },
        tasks: async ( root, args, context ) => {
            return await tasks_data_from_tag({ tag_id: root.id })
        },
        goals: async ( root, args, context ) => {
            return await goals_data_from_tag({ goal_id: root.id })            
        },
    }
}
