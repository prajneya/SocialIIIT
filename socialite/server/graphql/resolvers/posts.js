const { Post, Queue } = require('../../models/Post');
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
        async didIUpvoteAnswer(_, { postId, email }, context){
            try{
                const user = checkAuth(context);

                const hasUpvoted = {}

                const post = await Post.findById(postId);
                if(post){
                    for(var answer in post.answers){
                        const upvote = post.answers[answer].upvotes.find((upvote_answer) => upvote_answer.email === user.email);
                        if(upvote){
                            hasUpvoted[post.answers[answer].id] = true;
                        }
                        else{
                            hasUpvoted[post.answers[answer].id] = false;
                        }
                    }
                    return hasUpvoted;
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

                const hasDownvoted = {}

                const post = await Post.findById(postId);
                if(post){
                    for(var answer in post.answers){
                        const downvote = post.answers[answer].downvotes.find((downvote_answer) => downvote_answer.email === user.email);
                        if(downvote){
                            hasDownvoted[post.answers[answer].id] = true;
                        }
                        else{
                            hasDownvoted[post.answers[answer].id] = false;
                        }
                    }
                    return hasDownvoted;
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
        async createPost(_, { title, body, tags }, context){
            const user = checkAuth(context);

            console.log(tags);

            const newPost = new Post({
                title,
                body, 
                email: user.email,
                createdAt: new Date().toISOString(),
                tags
            });
            
            var id = "";
            post = {}

            await newPost.save().then( (saved) =>
            {
                post = saved
                console.log(saved)
                id = saved.id;
            });
            
            console.log(id);

            const newQueue = new Queue({
                _id: id,
                createdAt: new Date().toISOString()
            });

            const queue = await newQueue.save();

            console.log(queue);

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
        async removeUpvoteQuestion(_, { postId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.upvotes.find((upvote) => upvote.email === user.email)){
                    const upvoteIndex = post.upvotes.find((upvote) => upvote.email === user.email);
                    post.upvotes.splice(upvoteIndex, 1);
                    await post.save();
                    return post;
                }
                else{
                    throw new Error('Question Not Upvoted');   
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
        async removeDownvoteQuestion(_, { postId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.downvotes.find((downvote) => downvote.email === user.email)){
                    const downvoteIndex = post.downvotes.find((downvote) => downvote.email === user.email);
                    post.downvotes.splice(downvoteIndex, 1);
                    await post.save();
                    return post;
                }
                else{
                    throw new Error('Question Not Downvoted');   
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
        async removeUpvoteAnswer(_, { postId, answerId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                const answer = post.answers.find((r_answer) => r_answer.id === answerId);
                if(answer){
                    if(answer.upvotes.find((upvote) => upvote.email === user.email)){
                        const upvoteIndex = answer.upvotes.find((upvote) => upvote.email === user.email);
                        answer.upvotes.splice(upvoteIndex, 1);
                        await post.save();
                        return post;
                    }
                    else{
                        throw new Error('Answer not Upvoted')  
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
        },
        async removeDownvoteAnswer(_, { postId, answerId, email }, context){
            const user = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                const answer = post.answers.find((r_answer) => r_answer.id === answerId);
                if(answer){
                    if(answer.downvotes.find((downvote) => downvote.email === user.email)){
                        const downvoteIndex = answer.downvotes.find((downvote) => downvote.email === user.email);
                        answer.downvotes.splice(downvoteIndex, 1);
                        await post.save();
                        return post;
                    }
                    else{
                        throw new Error('Answer not Downvoted')  
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