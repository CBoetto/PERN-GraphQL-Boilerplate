import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import path from 'path'
import cors from 'cors'
import cookieSession from 'cookie-session'

import db from './db'
import models from './db/models'
import resolvers from './resolvers'
import schema from './schema'

const app = express();

// setting up cookies
app.use(
    cookieSession({
        name: 'session',
        keys: 'k1,k2',
        maxAge: 30 * 60 * 1000,
        domain: 'http://localhost:8000',
        path: '/',
    }),
);

const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
};

app.use(cors(corsOptions))

// Create server object here
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req, res }) => {
        let cookie = ''
        let clientToken = ''
        if (req.headers.cookie) {
        cookie = req.headers.cookie
        clientToken = cookie.slice(7)
        }
        return {
        models,
        req,
        res,
        clientToken,
        }
    }
});



const startListening = () => {

    // body parsing middleware
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))


    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')))

    // any remaining requests with an extension (.js, .css, etc) send 404
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
            const err = new Error('Not found')
            err.status = 404
            next(err)
        } else {
            next()
        }
    })

    // sends index.html
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public/index.html'))
    })

    // error handling endware
    app.use((err, req, res, next) => {
        console.error(err)
        console.error(err.stack)
        res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
    
    // start listening
    app.listen({ port: 8000 }, () => {
        console.log('Apollo Server on port 8000/graphql')
    })


    //set up socket control center here
}

const syncDb = () => db.sync()

async function bootApp() {
    await syncDb()
    await startListening()
}

server.applyMiddleware({ 
    app, 
    path: '/graphql',
    cors: corsOptions 
});

bootApp()


