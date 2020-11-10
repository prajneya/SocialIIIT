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
        tags: JSONObject
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
    type User{
    	id: ID!
        username: String!
    	email: String!
    	token: String!
    	createdAt: String!
        rating: Int!
        volatility: Float!
        time_answered: Int!
    }
    type field1{
        val: Int!
        flag: Int!
    }
    type field2{
        val: String!
        flag: Int!
    }
    type field3{
        val: [String]!
        flag: [Int]!
    }
    type Profile{
    	hosnum: field1
    	hosname: field2
    	house: field2
    	sports: field3
    	clubs: field3
    	match: Float
    	email: String
    }
    type Recommend{
        id: ID!
        match: Float!
        email: String!
    }
    input RegisterInput{
        username: String!
    	email: String!
    	password: String!
    	confirmPassword: String!
    }
    type Notif{
        id: String!
        match: Float!
        email: String!
        type: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        recommend(id: String!): [Recommend]!
        didIUpvoteQuestion(postId: ID!, email: String!): Boolean!
        didIDownvoteQuestion(postId: ID!, email: String!): Boolean!
        didIUpvoteAnswer(postId: ID!, email: String!): JSONObject
        didIDownvoteAnswer(postId: ID!, email: String!): JSONObject
        profile(curid: String!, id: String!): Profile!
        getNotif(id: String!): [Notif]!
    }
    type Mutation{
    	register(registerInput: RegisterInput): User!
    	login(email: String!, password: String!): User!
        createPost(title: String!, body: String!, tags: JSONObject): Post!
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
        frenaccept(user_id: String!, fren_id: String!): ID
        frenreject(user_id: String!, fren_id: String!): ID
        frenrequest(user_id: String!, fren_id: String!): ID
	    subsave(id: String!, sub: String!): ID
        meetaccept(user_id: String!, fren_id: String!): ID
        meetreject(user_id: String!, fren_id: String!): ID
        meetrequest(user_id: String!, fren_id: String!): ID
    } 
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
