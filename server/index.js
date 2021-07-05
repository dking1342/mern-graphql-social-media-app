import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server';

import connectdb from './config/mongodb.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

// dotenv init
dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
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
