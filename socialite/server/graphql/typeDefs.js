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
    	email: String!
    	password: String!
    	confirmPassword: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
        recommend(id: String!): [Recommend]!
	profile(curid: String!, id: String!): Profile!
    }
    type Mutation{
    	register(registerInput: RegisterInput): User!
    	login(email: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        frenaccept(user_id: ID!, fren_id: ID!): ID
        frenreject(user_id: ID!, fren_id: ID!): ID
        frenrequest(user_id: ID!, fren_id: ID!): ID
    } 
`
