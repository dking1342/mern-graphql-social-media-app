
import Post from '../../models/Post.js';
import { isAuth } from '../../utils/auth.js';


const posts = {
    Query:{
        async getPosts(){
            try {
                const posts = await Post.find({});
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
            try {
                // runs helper function to ensure user is authorized                
                const user = isAuth(context);
                let { valid, errors, auth:{ data }, authValid } = user;

                // checks to see if there are any errors when authenticating the user
                if(!valid){
                    return new Error(errors.general)
                }

                // checks if the user data with the token is there
                if(!authValid){
                    // creates a new post and saves it to the db
                    const newPost = new Post({
                        body,
                        user: data.id,
                        username: data.username,
                        createdAt: new Date().toISOString()
                    })
                    const post = await newPost.save();
                    return post
                }
            } catch (error) {
                return new Error(error.message)
            }
        }
    }
};

export default posts;