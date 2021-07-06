import postResolvers from './posts.js';
import userResolvers from './users.js';
import commentResolvers from './comments.js';
import likeResolvers from './likes.js';

const resolvers = {
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