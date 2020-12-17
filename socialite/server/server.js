const { MONGODB } = require('./config.js');
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const mongoose = require('mongoose');
const postFullTextSearch = require('./search.js')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`MongoDB connected.`);
        return server.listen({ port: 4000});
    })
    .then((res) => {
    console.log(`Server running at ${res.url}`);
});
