import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { typeDefs } from './typesDefs.mjs'
import { resolvers } from './resolvers.mjs'

const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginLandingPageGraphQLPlayground] });
server.listen().then(({ url }) => {
    console.log(`Server start on at ${url}`);
})