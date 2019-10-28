import { Pool } from '~/app/config'

export const simpleInsertQuery = ( args, responseTable ) => {
    return Pool().query(`
        INSERT INTO muskify.${responseTable} (${Object.keys(args).join(", ")}) 
        VALUES (${Object.keys(args).map((val, i) => `$${i+1}`).join(", ")})
        RETURNING *
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}

export const simpleQuery = ( args, responseTable ) => {
    if(Object.keys(args).length)
        return Pool().query(`
            SELECT * FROM muskify.${responseTable}
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`).join(" AND ")}
        `, Object.values(args))
        .then(res => res.rows)
        .catch(() => null)
    else
        return Pool().query(`
            SELECT * FROM muskify.${responseTable}
        `)
        .then(res => res.rows)
        .catch(() => null)
}

export const innerJoinQuery = ( args, responseTable, intermediaryTable, foreignKey ) => {
    return Pool().query(`
        SELECT * FROM muskify.${responseTable}
        WHERE id IN (
            SELECT ${foreignKey} FROM muskify.${intermediaryTable}
            WHERE ${Object.keys(args).map((val, i) => `${val}=$${i+1}`).join(" AND ")}
        )
    `, Object.values(args))
    .then(res => res.rows)
    .catch(() => null)
}
