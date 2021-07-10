import gql from "graphql-tag";
import CONSTANTS from "./constants";

const graphqlMutations = type => {
    switch (type) {
        case CONSTANTS.REGISTER_USER:
            return gql`
                mutation register($username:String!, $email:String!, $password:String!, $confirmPassword:String!){
                    register(registerInput:{username:$username,email:$email,password:$password,confirmPassword:$confirmPassword}){
                        id
                        email
                        username
                        createdAt
                        token
                    }
                }
            `;

        case CONSTANTS.LOGIN_USER:
            return gql`
                mutation login($username:String!,$password:String!){
                    login(username:$username,password:$password){
                        id
                        username
                        email
                        createdAt
                        token
                    }
                }
            `;
            
        case CONSTANTS.CREATE_POST:
            return gql`
                mutation createPost($body:String!){
                    createPost(body:$body){
                        id
                        body
                        createdAt
                        username
                        likes{
                            id
                            username
                            createdAt
                        }
                        likeCount
                        comments{
                            id
                            body
                            username
                            createdAt
                        }
                        commentCount
                    }
                }
            `;  
        
        case CONSTANTS.LIKE_POST:
            return gql`
                mutation likePost($postId:ID!){
                    likePost(postId:$postId){
                        id
                        likes{
                            id
                            username
                        }
                        likeCount
                    }
                }
            `;
        
        case CONSTANTS.CREATE_COMMENT:
            return gql`
                mutation createComment($postId:ID!,$body:String!){
                    createComment(postId: $postId, body: $body) {
                        id
                        commentCount
                        comments {
                            id
                            createdAt
                            username
                            body
                        }
                    }
                }
            `;

        case CONSTANTS.DELETE_POST:
            return gql`
                mutation deletePost($postId:ID!){
                    deletePost(postId:$postId)
                }
            `;
        
        case CONSTANTS.DELETE_COMMENT:
            return gql`
                mutation deleteComment($postId:ID!,$commentId:ID!){
                    deleteComment(postId:$postId,commentId:$commentId){
                    id
                    comments{
                        id
                        username
                        body
                        createdAt
                    }
                    commentCount
                    }
                }
            `;
    
        default:
            return;
    }
};

export default graphqlMutations;