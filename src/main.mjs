import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express';
import http from 'http';
import expressJwt from 'express-jwt'
import { connected } from './mongodb.mjs'

import { typeDefs } from './typesDefs.mjs'
import { resolvers } from './resolvers.mjs'
async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.use(
        expressJwt({
            secret: 'SECRET',
            algorithms: ['HS256'],
            credentialsRequired: false
        })
    )
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const user = req.user || null
            console.log('user: ', { user });
            return { user }
        },
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
    app.listen(4000, async () => {
        connected();
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    })

}

startApolloServer(typeDefs, resolvers);
