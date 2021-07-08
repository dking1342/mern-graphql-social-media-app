import gql from "graphql-tag";
import CONSTANTS from "./constants";

const graphqlQueries = (type) => {
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
        
        case CONSTANTS.SINGLE_POST_QUERY:
            return gql`
                query getPost($postId:ID!){
                    getPost(postId:$postId){
                        id
                        body
                        username
                        createdAt
                        comments{
                            id
                            username
                            body
                            createdAt
                        }
                        commentCount
                        likes{
                            id
                            username
                        }
                        likeCount
                    }
                }
            `;
                
        default:
            return;
    }
}

export default graphqlQueries;