import React from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import img from '../assets/elliot.jpeg';
import moment from 'moment';
import { Link } from 'react-router-dom';

const PostCard = ({post}) => {
    const { body, createdAt, id, username, likeCount, commentCount } = post;

    const likePost = () => {
        console.log('like post')
    };

    const commentPost = () => {
        console.log('comment')
    }

    return (
        <Card fluid>
             <Card.Content>
                 <Image floated='right' size='mini' src={img} />
                 <Card.Header>{username}</Card.Header>
                 <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                 <Card.Description>{body}</Card.Description>
             </Card.Content>
             <Card.Content extra>
                 <Button as='div' labelPosition='right' onClick={likePost}>
                     <Button color='teal' basic>
                         <Icon name='heart' />
                     </Button>
                     <Label as='a' basic color='teal' pointing='left' >
                         {likeCount}
                     </Label>
                 </Button>
                 <Button as='div' labelPosition='right' onClick={commentPost}>
                     <Button color='blue' basic>
                         <Icon name='comments' />
                     </Button>
                     <Label as='a' basic color='blue' pointing='left' >
                         { commentCount }
                     </Label>
                 </Button>
             </Card.Content>
         </Card>
    )
}

export default PostCard
