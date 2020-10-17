const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        email: String!
        createdAt: String!
    }
    type User{
    	id: ID!
    	email: String!
    	token: String!
    	createdAt: String!
    }
    input RegisterInput{
    	email: String!
    	password: String!
    	confirmPassword: String!
    }
    type Query{
        getPosts: [Post]
    }
    type Mutation{
    	register(registerInput: RegisterInput): User!
    	login(email: String!, password: String!): User!
    } 
`