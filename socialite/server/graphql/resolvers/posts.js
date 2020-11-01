const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

const { UserInputError } = require('apollo-server')


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
        },
        async didIUpvoteQuestion(_, { postId, email }, context){
            try{
                const user = checkAuth(context);

                const post = await Post.findById(postId);
                if(post){
                    if(post.upvotes.find((upvote) => upvote.email === user.email)){
                        return true;
                    }
                    else{
                        return false;   
                    }
                }
                else{
                    throw new Error('Post not Found');
                }
            } catch (err){
                throw new Error(err);
            }
        },
        async didIDownvoteQuestion(_, { postId, email }, context){
            try{
                const user = checkAuth(context);

                const post = await Post.findById(postId);
                if(post){
                    if(post.downvotes.find((downvote) => downvote.email === user.email)){
                        return true;
                    }
                    else{
                        return false;   
                    }
                }
                else{
                    throw new Error('Post not Found');
                }
            } catch (err){
                throw new Error(err);
            }
        },
        async didIUpvoteAnswer(_, { postId, answerId, email }, context){
            try{
                const user = checkAuth(context);

                const post = await Post.findById(postId);
                if(post){
                    const answer = post.answers.find((r_answer) => r_answer.id === answerId);
                    if(answer){
                        if(answer.upvotes.find((upvote) => upvote.email === user.email)){
                            return true;
                        }
                        else{
                            return false;  
                        }    
                    }
                    else{
                        throw new Error('Answer not Found');
                    }
                }
                else{
                    throw new Error('Post not Found');
                }
            } catch (err){
                throw new Error(err);
            }
        },
        async didIDownvoteAnswer(_, { postId, answerId, email }, context){
            try{
                const user = checkAuth(context);

                const post = await Post.findById(postId);
                if(post){
                    const answer = post.answers.find((r_answer) => r_answer.id === answerId);
                    if(answer){
                        if(answer.downvotes.find((downvote) => downvote.email === user.email)){
                            return true;
                        }
                        else{
                            return false;  
                        }    
                    }
                    else{
                        throw new Error('Answer not Found');
                    }
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
        },
        async addAnswer(_, { postId, body }, context){
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Empty Answer', {
                  errors: {
                    body: 'Answer body must not empty'
                  }
                });
            }

            const post = await Post.findById(postId);
            if(post){
                post.answers.unshift({
                    body,
                    email: user.email,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            }
            else{
                throw new Error('Post not Found');
            }
                
        },
        async upvoteQuestion(_, { postId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            console.log("UPVOTES", post.upvotes)
            console.log("DOWNVOTES", post.downvotes)
            console.log("TAGS", post.tags)
            if(post){
                if(post.downvotes.find((downvote) => downvote.email === user.email)){
                    throw new Error('Question Already downvoted');
                }
                else{
                    if(post.upvotes.find((upvote) => upvote.email === user.email)){
                        throw new Error('Question Already upvoted');
                    }
                    else{
                        post.upvotes.unshift({
                            email: user.email,
                            createdAt: new Date().toISOString()
                        });
                        await post.save();
                        return post;    
                    }
                }
            }
            else{
                throw new Error('Post not Found');
            }
        },
        async downvoteQuestion(_, { postId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.upvotes.find((upvote) => upvote.email === user.email)){
                    throw new Error('Question Already upvoted');
                }
                else{
                    if(post.downvotes.find((downvote) => downvote.email === user.email)){
                        throw new Error('Question Already Downvoted');
                    }
                    else{
                        post.downvotes.unshift({
                            email: user.email,
                            createdAt: new Date().toISOString()
                        });
                        await post.save();
                        return post; 
                    }
                }
            }
            else{
                throw new Error('Post not Found');
            }
        },
        async upvoteAnswer(_, { postId, answerId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                const answer = post.answers.find((r_answer) => r_answer.id === answerId);
                if(answer){
                    if(answer.downvotes.find((downvote) => downvote.email === user.email)){
                        throw new Error('Answer Already Downvoted');
                    }
                    else{
                        if(answer.upvotes.find((upvote) => upvote.email === user.email)){
                            throw new Error('Answer Already Upvoted');
                        }
                        else{
                            answer.upvotes.unshift({
                                email: user.email,
                                createdAt: new Date().toISOString()
                            });
                            await post.save();
                            return post;    
                        }  
                    }     
                }
                else{
                    throw new Error('Answer not Found');
                }
                
            }
            else{
                throw new Error('Post not Found');
            }
        },
        async downvoteAnswer(_, { postId, answerId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                const answer = post.answers.find((r_answer) => r_answer.id === answerId);
                if(answer){
                    if(answer.upvotes.find((upvote) => upvote.email === user.email)){
                        throw new Error('Answer Already Upvoted');
                    }
                    else{
                        if(answer.downvotes.find((downvote) => downvote.email === user.email)){
                            throw new Error('Answer Already Downvoted');
                        }
                        else{
                            answer.downvotes.unshift({
                                email: user.email,
                                createdAt: new Date().toISOString()
                            });
                            await post.save();
                            return post;    
                        }  
                    }     
                }
                else{
                    throw new Error('Answer not Found');
                }
                
            }
            else{
                throw new Error('Post not Found');
            }
        }
    }
}