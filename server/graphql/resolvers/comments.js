import { AuthenticationError, UserInputError } from "apollo-server-errors";
import Post from "../../models/Post.js";
import { isAuth } from "../../utils/auth.js";

const comments = {
    Query:{

    },
    Mutation:{
        createComment: async(_,{ postId, body },context) => {
            const { username } = isAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment',{
                    errors:{
                        body:'Comment body must not be empty'
                    }
                })
            }
            try {

                const post = await Post.findById(postId)
                if(post){
                    post.comments.unshift({
                        body,
                        username,
                        createdAt: new Date().toISOString()
                    });
                    await post.save();
                    return post;
                } else {
                    throw new UserInputError('Post not found');
                } 
            } catch (error) {
                throw new Error('Bad request');
            }
        },
        deleteComment: async(_,{ postId, commentId },context) => {
            const { username } = isAuth(context);

            try {
                const post = await Post.findById(postId);
                if(post){
                    const commentIndex = post.comments.findIndex(c => c.id === commentId);

                    if(post.comments[commentIndex].username === username){
                        post.comments.splice(commentIndex, 1);
                        await post.save();
                        return post;
                    } else {
                        return new AuthenticationError('Action not allowed');
                    }
                } else {
                    return new UserInputError('Post not found')
                }
            } catch (error) {
                throw new Error('Bad request')
            }
        }
    }
};

export default comments;