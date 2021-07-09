import { useQuery } from '@apollo/client';
import React, { useContext } from 'react'
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import CONSTANTS from '../gql/constants';
import graphqlQueries from '../gql/query';
import img from '../assets/elliot.jpeg';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth';


const SinglePost = (props) => {
    const { user } = useContext(AuthContext);
    const postId = props.match.params.postId;
    const { loading, error, data } = useQuery(graphqlQueries(CONSTANTS.SINGLE_POST_QUERY),{
        variables:{
            postId
        }
    });

    const deletePost = () => {
        props.history.push('/')
    }

    if(loading){
        return(
            <div className="ui">
                <div className="ui active loader"></div>
            </div>
        )
    }
    if(error) throw new Error(error)
    if(data){
        const { id,body,createdAt,username,comments,likes,likeCount,commentCount} = data.getPost;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width='2'>
                        <Image 
                            src={img}
                            size='small'
                            floated='right'
                        />
                    </Grid.Column>
                    <Grid.Column width='10'>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton post={{id,likes,likeCount}} />
                                <Button as="div" labelPosition="right" onClick={()=>console.log('comment')}>
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        { commentCount }
                                    </Label>
                                </Button>
                                {
                                    user && user.username === username && (
                                        <DeleteButton 
                                            postId={id}
                                            callback={deletePost}
                                        />
                                    )
                                }
                            </Card.Content>
                        </Card>
                        {
                            comments.map(comment=>(
                                <Card fluid key={comment.id}>
                                    <Card.Content>
                                        {
                                            user && user.username === comment.username && (
                                                <DeleteButton postId={id} commentId={comment.id} />
                                            )
                                        }
                                        <Card.Header>
                                            {comment.username}
                                        </Card.Header>
                                        <Card.Meta>
                                            {moment(createdAt).fromNow(true)}
                                        </Card.Meta>
                                        <Card.Description>
                                            {comment.body}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            // <PostCard post={data.getPost}/>
        )
    } 
}

export default SinglePost
