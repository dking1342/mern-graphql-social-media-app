import dotenv from 'dotenv';
import { ApolloServer, PubSub } from 'apollo-server';

import connectdb from './config/mongodb.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

// dotenv init
dotenv.config();

// subscriptions init
const pubsub = new PubSub();

// create a new apollo server object
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req,pubsub}),
    subscriptions:{
        path:'/subscriptions'
    }
});

// server init
const PORT = process.env.GRAPHQL_PORT;
connectdb()
    .then(()=>{
        console.log('MongoDB connection made...')
        return server.listen({port:PORT})
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })
