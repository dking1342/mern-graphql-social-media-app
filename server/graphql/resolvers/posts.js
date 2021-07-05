
import { AuthenticationError } from 'apollo-server-errors';
import Post from '../../models/Post.js';
import { isAuth } from '../../utils/auth.js';


const posts = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find({}).sort({createdAt: -1});
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_,{ postId }){
            try {
                const post = await Post.findById(postId);
                if(post){
                    return post;
                } else {
                    return new Error('Post not found')
                }
            } catch (error) {
                return new Error('Post not found, bad request');
            }
        }      
    },
    Mutation:{
        async createPost(_, { body },context){
            // runs helper function to ensure user is authorized                
            const user = isAuth(context);
            try {
                // creates a new post and saves it to the db
                const newPost = new Post({
                    body,
                    user: user.id,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                const post = await newPost.save();
                return post
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async deletePost(_,{ postId }, context){
            // runs helper function to ensure user is authorized                
            const user = isAuth(context);

            try {
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
};

export default posts;