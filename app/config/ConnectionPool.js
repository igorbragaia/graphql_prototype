import { Pool as pgPool } from 'pg'

let SingletonPool = null

const Pool = () => {
    if(!SingletonPool) {
        // console.log(`Pool does not exist yet... Creating one`)
        SingletonPool = new pgPool({ 
            host: process.env.PG_HOST, 
            port: process.env.PG_PORT, 
            user: process.env.PG_USER, 
            database: process.env.PG_DATABASE, 
            password: process.env.PG_PASSWORD, 
            connectionTimeoutMillis : 5000,
            ssl: true
        })

        return SingletonPool
    } else {
        // console.log(`Pool already exists... Retrieving it...`)
        return SingletonPool
    }
}

export default Pool
