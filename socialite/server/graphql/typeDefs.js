const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        title: String!
        body: String!
        email: String!
        createdAt: String!
        answers: [Answer]!
        upvotes: [Upvote]!
        tags: [Tag]!
    }
    type Upvote{
        id: ID!
        email: String!
        createdAt: String!
    }
    type Answer{
        id: ID!
        body: String!
        email: String!
        upvotes: [Upvote]!
        createdAt: String!
    }
    type Report{
        id: ID!
        body: String!
        email: String!
        createdAt: String!
    }
    type Tag{
        id: ID!
        tag: String!
    }
    type User{
    	id: ID!
    	email: String!
    	token: String!
    	createdAt: String!
    }
    type Profile{
        id: ID!
        friends: [ID]!
        house: String!
        hosnum: Int!
        hosname: String!
        sports: [String]!
        clubs: [String]!
    }
    type Recommend{
        id: ID!
        match: Float!
        email: String!
    }
    input RegisterInput{
    	email: String!
    	password: String!
    	confirmPassword: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        recommend(id: String!): [Recommend]!
    }
    type Mutation{
    	register(registerInput: RegisterInput): User!
    	login(email: String!, password: String!): User!
        createPost(title: String!, body: String!): Post!
        deletePost(postId: ID!): String!
        addAnswer(postId: ID!, body: String!): Post!
    } 
`
