const { Post, Queue } = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

const { UserInputError } = require('apollo-server')
const { User, Skills, Timeline } = require('../../models/User');


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
        async getTopPosts(){
            try{
                const posts = await Post.find().sort({ upvotes: -1 });
                posts.sort((a, b) => (a.upvotes.length < b.upvotes.length) ? 1 : -1);
                return posts.slice(0, 5);
            } catch(err){
                throw new Error(err);
            }
        },
        async getTopRated(){
            try{
                const users = await User.find().sort({ rating: -1 });
                users.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
                return users.slice(0, 10);
            } catch(err){
                throw new Error(err);
            }
        },
        async getTopAnswered(){
            try{
                const users = await User.find().sort({ times_answered: -1 });
                users.sort((a, b) => (a.times_answered < b.times_answered) ? 1 : -1);
                return users.slice(0, 10);
            } catch(err){
                throw new Error(err);
            }
        },
        async getTopTags(){
            try{
                var pretags = [
                    {'name' : 'Data Structures', 'value' : 0},
                    {'name' : 'C-programming', 'value' : 0},
                    {'name' : 'Probability and Statistics', 'value' : 0},
                    {'name' : 'Database Security', 'value' : 0},
                    {'name' : 'Science', 'value' : 0},
                    {'name' : 'Discrete Structures', 'value' : 0},
                    {'name' : 'Speech Processing', 'value' : 0},
                    {'name' : 'Computer Vision', 'value' : 0},
                    {'name' : 'Internships', 'value' : 0},
                    {'name' : 'Resume', 'value' : 0},
                    {'name' : 'Computational Linguistics', 'value' : 0},
                    {'name' : 'Algorithm Analysis & Design', 'value': 0},
                    {'name' : 'NLP', 'value' : 0}
                ]

                const posts = await Post.find();
                if(posts){
                    for(var i = 0; i < posts.length; i++)
                    {   
                        if(posts[i].tags){
                            var tagkeys = Object.keys(posts[i].tags);
                            for(var j = 0; j < tagkeys.length; j++)
                            {
                                for(var k = 0; k < pretags.length; k++)
                                {
                                    if(pretags[k]['name'] === tagkeys[j])
                                    {
                                        pretags[k]['value'] += 1;
                                    }
                                }   
                            }
                        }
                    }
                    pretags.sort((a, b) => (a['value'] < b['value']) ? 1 : -1);
                }
                return pretags.slice(0, 3);
            } catch(err){
                throw new Error(err);
            }
        },
        async getSkills(_, { email }, context){
            const skills = await Skills.findOne({ email });
            if(!skills){
                return {};
            }
            return skills.skills;
        },
        async getTimelineInfo(_, { username }, context){
            const user = await User.findOne({ username })
            var timeline = {}
            if(user){
                timeline['rating'] = user.rating;
                timeline['contributions'] = user.times_answered;
                timeline['email'] = user.email;
                timeline['id'] = user.id;
                var email = user.email;
                const skills = await Skills.findOne({ email });

                if(!skills){
                    timeline['skills'] = {};
                }
                else{
                    timeline['skills'] = skills.skills;
                }

                return timeline;
            }
            else{
                throw new Error('User not Found');
            }
        },
        async getTimelineData(_, {}, context){
            const user = checkAuth(context);

            const timelineData = await Timeline.findById(user.id);

            const timelineDisplayData = {};

            if(timelineData){
                timelineDisplayData['bio'] = timelineData['about'];
                timelineDisplayData['fblink'] = timelineData['fblink'];
                timelineDisplayData['ghlink'] = timelineData['ghlink'];

                timelineDisplayData['pOneTitle'] = timelineData['pOneTitle'];
                timelineDisplayData['pOneGhLink'] = timelineData['pOneGhLink'];
                timelineDisplayData['pOneELink'] = timelineData['pOneELink'];
                timelineDisplayData['pOneDesc'] = timelineData['pOneDesc'];

                timelineDisplayData['pTwoTitle'] = timelineData['pTwoTitle'];
                timelineDisplayData['pTwoGhLink'] = timelineData['pTwoGhLink'];
                timelineDisplayData['pTwoELink'] = timelineData['pTwoELink'];
                timelineDisplayData['pTwoDesc'] = timelineData['pTwoDesc'];

                timelineDisplayData['pThreeTitle'] = timelineData['pThreeTitle'];
                timelineDisplayData['pThreeGhLink'] = timelineData['pThreeGhLink'];
                timelineDisplayData['pThreeELink'] = timelineData['pThreeELink'];
                timelineDisplayData['pThreeDesc'] = timelineData['pThreeDesc'];

                return timelineDisplayData;
            }
            else{
                throw new Error('User not Found');
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
                    const upvoteIndex = post.upvotes.findIndex((upvote) => upvote.email === user.email);
                    console.log(upvoteIndex)
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
                    const downvoteIndex = post.downvotes.findIndex((downvote) => downvote.email === user.email);
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

                            const author = await Skills.findOne({ email: answer.email })
                            if(author){
                                for(tag in post.tags){
                                    if(author.skills[tag]){
                                        author.skills[tag] = parseFloat(author.skills[tag])+(user.rating/1000)
                                    }
                                    else{
                                        author.skills[tag] = (user.rating/1000)
                                    }
                                }
                                await author.updateOne({ skills: author.skills });
                            }
                            else{
                                var answerSkills = {};

                                for(tag in post.tags){
                                    answerSkills[tag] = (user.rating/1000)
                                }

                                const newAuthor = new Skills({
                                    email: answer.email,
                                    skills: answerSkills
                                })
                                await newAuthor.save()
                            }
                                                        

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
                        const upvoteIndex = answer.upvotes.findIndex((upvote) => upvote.email === user.email);
                        answer.upvotes.splice(upvoteIndex, 1);
                        await post.save();
                        const author = await Skills.findOne({ email: answer.email })
                        if(author){
                            for(tag in post.tags){
                                if(author.skills[tag]){
                                    author.skills[tag] = parseFloat(author.skills[tag])-(user.rating/1000)
                                    console.log(author.skills[tag])
                                }
                            }
                            await author.updateOne({ skills: author.skills });
                        }
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
                        const downvoteIndex = answer.downvotes.findIndex((downvote) => downvote.email === user.email);
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