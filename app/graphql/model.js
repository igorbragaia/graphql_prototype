import { Pool } from '~/app/config'

export const user_data = args => {
    if(Object.keys(args).length)
        return Pool().query(`
            SELECT * FROM muskify.user
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        `, Object.values(args))
        .then(res => res.rows)
        .catch(() => null)
    else
        return Pool().query(`
            SELECT * FROM muskify.user
        `)
        .then(res => res.rows)
        .catch(() => null)
}

export const tags_data = args => {
    if(Object.keys(args).length)
        return Pool().query(`
            SELECT * FROM muskify.tag
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        `, Object.values(args))
        .then(res => res.rows)
        .catch(() => null)
    else
        return Pool().query(`
            SELECT * FROM muskify.tag
        `)
        .then(res => res.rows)
        .catch(() => null)
}

export const tasks_data = args => {
    if(Object.keys(args).length)
        return Pool().query(`
            SELECT * FROM muskify.task
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        `, Object.values(args))
        .then(res => res.rows)
        .catch(() => null)
    else
        return Pool().query(`
            SELECT * FROM muskify.task
        `)
        .then(res => res.rows)
        .catch(() => null)
}

export const goals_data = args => {
    if(Object.keys(args).length)
        return Pool().query(`
            SELECT * FROM muskify.goal
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        `, Object.values(args))
        .then(res => res.rows)
        .catch(() => null)
    else
        return Pool().query(`
            SELECT * FROM muskify.goal
        `)
        .then(res => res.rows)
        .catch(() => null)
}
 
export const goals_data_from_task = args => {
    return Pool().query(`
        SELECT * FROM muskify.goal
        WHERE id IN (
            SELECT goal_id FROM muskify.tasks_goals
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}

export const tags_data_from_task = args => {
    return Pool().query(`
        SELECT * FROM muskify.tag
        WHERE id IN (
            SELECT tag_id FROM muskify.task_tags
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}

export const tasks_data_from_goal = args => {
    return Pool().query(`
        SELECT * FROM muskify.task
        WHERE id IN (
            SELECT task_id FROM muskify.tasks_goals
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}

export const tags_data_from_goal = args => {
    return Pool().query(`
        SELECT * FROM muskify.tag
        WHERE id IN (
            SELECT tag_id FROM muskify.goal_tags
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}

export const tasks_data_from_tag = args => {
    return Pool().query(`
        SELECT * FROM muskify.task
        WHERE id IN (
            SELECT task_id FROM muskify.task_tags
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}

export const goals_data_from_tag = args => {
    return Pool().query(`
        SELECT * FROM muskify.goal
        WHERE id IN (
            SELECT goal_id FROM muskify.goal_tags
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`)}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}
