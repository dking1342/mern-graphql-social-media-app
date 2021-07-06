import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
import img from '../assets/elliot.jpeg';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {
    const { body, createdAt, id, username, likeCount, commentCount, likes, comments } = post;

    return (
        <Card fluid>
             <Card.Content>
                 <Image floated='right' size='mini' src={img} />
                 <Card.Header>{username}</Card.Header>
                 <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                 <Card.Description>{body}</Card.Description>
             </Card.Content>
             <Card.Content extra>
                 <p>buttons here</p>
             </Card.Content>
         </Card>
    )
}

export default PostCard
