const { gql } = require('apollo-server');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

module.exports = gql`
    
    scalar JSONObject

    type Post{
        id: ID!
        title: String!
        body: String!
        email: String!
        createdAt: String!
        answers: [Answer]
        upvotes: [Upvote]
        downvotes: [Downvote]
        tags: [Tag]!
    }
    type Upvote{
        id: ID
        email: String
        createdAt: String
    }
    type Downvote{
        id: ID
        email: String
        createdAt: String
    }
    type Answer{
        id: ID
        body: String
        email: String
        upvotes: [Upvote]
        downvotes: [Downvote]
        createdAt: String
    }
    type Report{
        id: ID!
        postId: ID!
        answerId: ID
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
        didIUpvoteQuestion(postId: ID!, email: String!): Boolean!
        didIDownvoteQuestion(postId: ID!, email: String!): Boolean!
        didIUpvoteAnswer(postId: ID!, email: String!): JSONObject
        didIDownvoteAnswer(postId: ID!, email: String!): JSONObject
    }
    type Mutation{
    	register(registerInput: RegisterInput): User!
    	login(email: String!, password: String!): User!
        createPost(title: String!, body: String!): Post!
        deletePost(postId: ID!): String!
        addAnswer(postId: ID!, body: String!): Post!
        upvoteQuestion(postId: ID!, email: String!): Post!
        upvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        downvoteQuestion(postId: ID!, email: String!): Post!
        downvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        removeUpvoteQuestion(postId: ID!, email: String!): Post!
        removeUpvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
        removeDownvoteQuestion(postId: ID!, email: String!): Post!
        removeDownvoteAnswer(postId: ID!, answerId: ID!, email: String!): Post!
    } 
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
