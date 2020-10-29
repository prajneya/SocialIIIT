const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
	Query: {
        async getPosts(){
            try{
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getPost(_, { postId }){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post;
                }
                else{
                    throw new Error('Post not Found');
                }
            } catch (err){
                throw new Error(err);
            }
        }
    },
    Mutation:{
        async createPost(_, { title, body }, context){
            const user = checkAuth(context);

            const newPost = new Post({
                title,
                body, 
                email: user.email,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        }
        async addAnswer(_, { postId, body }, context){
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId);
                if(post){
                    const answer = new Answer({
                        body,
                        email: user.email,
                        createdAt: new Date().toISOString()
                    })
                    
                    return post;
                }
                else{
                    throw new Error('Post not Found');
                }
            } catch (err){
                throw new Error(err);
            }
        }
    }
}