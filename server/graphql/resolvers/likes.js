import { UserInputError } from "apollo-server-errors";
import Post from "../../models/Post.js";
import { isAuth } from "../../utils/auth.js";

const likes = {
    Query:{

    },
    Mutation:{
        likePost: async (_,{ postId}, context) => {
            const { username } = isAuth(context);

            try {
                const post = await Post.findById(postId);
                if(post){
                    if(post.likes.find(like => like.username === username)){
                        // post already liked and the user is unlike it
                        post.likes = post.likes.filter(like => like.username !== username);
                    } else {
                        // post is not liked and the user likes it
                        post.likes.push({
                            username,
                            createdAt: new Date().toISOString()
                        });
                    }
                    await post.save();
                    return post;
                } else {
                    return new UserInputError('Post not found');
                }
            } catch (error) {
                throw new Error('Bad request')
            }
        }
    }
};

export default likes;