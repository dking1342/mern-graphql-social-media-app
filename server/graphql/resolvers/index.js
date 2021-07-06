import postResolvers from './posts.js';
import userResolvers from './users.js';
import commentResolvers from './comments.js';
import likeResolvers from './likes.js';

const resolvers = {
    Post:{
        likeCount: parent => parent.likes.length,
        commentCount: parent => parent.comments.length
    },
    Query:{
        ...postResolvers.Query,
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation
    },
    Subscription:{
        ...postResolvers.Subscription
    }
};

export default resolvers;