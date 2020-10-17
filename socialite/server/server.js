const { MONGODB } = require('./config.js');
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const mongoose = require('mongoose');

const userRouter = require('./routes/user-router');
const recosys = require('./recosys/collab')

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`MongoDB connected.`)
        return server.listen({ port: 5000});
    })
    .then((res) => {
    console.log(`Server running at ${res.url}`);
});

app.post('/recommend', recosys.main);
