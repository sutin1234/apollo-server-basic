import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express';
import http from 'http';

import { typeDefs } from './typesDefs.mjs'
import { resolvers } from './resolvers.mjs'
async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground,
            ApolloServerPluginDrainHttpServer({ httpServer })
        ]
    });

    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });
    app.listen(4000, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`))

}

startApolloServer(typeDefs, resolvers);
