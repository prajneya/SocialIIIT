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
    type Blog{
        id: ID!
        title: String!
        body: String!
        email: String!
        createdAt: String!
        comments: [Answer]
        likes: [Upvote]
        tags: JSONObject
    }
    type Tag{
        id: ID!
        name: String!
        weekly: Int!
        lifetime: Int!
    }
    type searchPost{
        _id: ID!
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
        times_answered: Int!
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
	batch: field2 
	stream: field2
    	sports: field3
    	clubs: field3
    	match: Float
        email: String!
	username: String!
        friend: Int!
	meet: Int!
    }
    type Recommend{
        id: ID!
        match: Float!
        email: String!
	username: String!
	meet: Int!
    }
    input RegisterInput{
        username: String!
    	email: String!
    	password: String!
    	confirmPassword: String!
	batch: String!
	stream: String!
    }
    input ResendInput{
	    id: String!
	    email: String!
	    username: String!
	    time: String!
    }
    type Notif{
        userId: String!
        match: Float!
        email: String!
	username: String!
        type: String!
	    time: String!
    }
    input ProfileEdits{
    	user_id: String!
    	house: String
    	hosnum: Int
    	hosname: String
    	sports: [String]
    	clubs: [String]
    }
    type Query{
        getPosts: [Post]
        getTopPosts: [Post]
        getPost(postId: ID!): Post
        getTopRated: [User]
        getTopAnswered: [User]
        getTags: [Tag]
        getTopTags: JSONObject
        recommend(id: String!): [Recommend]!
        didIUpvoteQuestion(postId: ID!, email: String!): Boolean!
        didIDownvoteQuestion(postId: ID!, email: String!): Boolean!
        didIUpvoteAnswer(postId: ID!, email: String!): JSONObject
        didIDownvoteAnswer(postId: ID!, email: String!): JSONObject
        profile(curid: String!, id: String!): Profile!
        getNotif(id: String!): [Notif]!
        getSkills(email: String!): JSONObject
        getTimelineInfo(username: String!): JSONObject
        searchByTextPost(query: String!): [searchPost]
        getTimelineData: JSONObject
        getUserTimelineData(id: ID) : JSONObject
        getUserBlogs(email: String): [Blog]
        getBlog(blogId: ID!): Blog
        forgotPass(email: String!): String
    }
    type Mutation{
        insertTag(name: String!): Tag!
        updateTag(tagname: String!): Tag!
    	register(registerInput: RegisterInput): User!
        verify(token: String!): String!
    	login(credential: String!, password: String!): User!
        createPost(title: String!, body: String!, tags: JSONObject): Post!
        createBlog(title: String!, body: String!, tags: JSONObject): Blog!
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
        edit(input: ProfileEdits): ID
        uploadPhoto(photo: Upload!): String
        updateProfile(name: String, fblink: String, ghlink: String, about: String, house: String, clubs: JSONObject, hostel: String, sports: JSONObject, pOneTitle: String, pOneGhLink: String, pOneELink: String, pOneDesc: String, pTwoTitle: String, pTwoGhLink: String, pTwoELink: String, pTwoDesc: String, pThreeTitle: String, pThreeGhLink: String, pThreeELink: String, pThreeDesc: String, roomNo: Int): String
        resend(data: ResendInput!): Int!
        passChange(token: String!, password: String!, confirmPassword: String!): Int
    } 
`;

const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
