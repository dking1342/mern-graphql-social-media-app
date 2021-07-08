import React, { useContext } from 'react'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import img from '../assets/elliot.jpeg';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

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
                 <Button labelPosition='right' as={Link} to={`/post/${id}`} >
                     <Button color='blue' basic>
                         <Icon name='comments' />
                     </Button>
                     <Label basic color='blue' pointing='left' >
                         { commentCount }
                     </Label>
                 </Button>
                 {
                     user && user.username === username && (
                         <Button as='div' color='red' floated='right' onClick={()=>console.log('delete posts')}>
                             <Icon name='trash' style={{margin:0}} />
                         </Button>
                     )
                 }
             </Card.Content>
         </Card>
    )
}

export default PostCard
