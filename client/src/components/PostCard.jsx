import React, { useContext } from 'react'
import { Card, Image } from 'semantic-ui-react';
import img from '../assets/elliot.jpeg';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';

const PostCard = ({post}) => {
    const { user } = useContext(AuthContext);
    const { body, createdAt, id, username, likes, likeCount, commentCount } = post;


    return (
        <Card fluid>
             <Card.Content>
                 <Image floated='right' size='mini' src={img} />
                 <Card.Header>{username}</Card.Header>
                 <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                 <Card.Description>{body}</Card.Description>
             </Card.Content>
             <Card.Content extra>
                <LikeButton 
                    post={{id,likes,likeCount}}
                />
                <CommentButton 
                    post={{id,commentCount}}
                />
                 {
                     user && user.username === username && (
                         <DeleteButton 
                            postId={id}
                         />
                     )
                 }
             </Card.Content>
         </Card>
    )
}

export default PostCard
