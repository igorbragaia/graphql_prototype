import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import graphql from '~/app/graphql'
process.setMaxListeners(Infinity)

const app = express()
    .use( bodyParser.json() )
    .use( bodyParser.urlencoded({ extended: true }) )
    .use( cors() )
    .use('/graphql', graphql)
    .get('/', ( req, res, next ) => res.status(200).send('Muskify API is online'))

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`)
})
