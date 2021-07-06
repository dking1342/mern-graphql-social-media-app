import gql from "graphql-tag";
import CONSTANTS from "./constants";

const graphqlFunc = (type) => {
    switch (type) {
        case CONSTANTS.FETCH_POSTS_QUERY:
            return gql`
                query getPosts{
                    getPosts{
                        id
                        body
                        username
                        createdAt
                        likeCount
                        likes{
                            username
                        }
                        commentCount
                        comments{
                            id
                            username
                            body
                            createdAt
                        }
                    }
                }
            `;
    
        default:
            return;
    }
}

export default graphqlFunc;