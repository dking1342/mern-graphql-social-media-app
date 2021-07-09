import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from 'semantic-ui-react'
import { AuthContext } from '../context/auth';
import CONSTANTS from '../gql/constants';
import graphqlMutations from '../gql/mutations';

const LikeButton = ({post:{id,likes,likeCount}}) => {
    const { user, logout } = useContext(AuthContext);
    const [isLiked, setIsLiked]=useState(false);
    const [likePost]=useMutation(graphqlMutations(CONSTANTS.LIKE_POST),{
        variables:{
            postId:id
        }
    });


    useEffect(()=>{
        if(user && likes.find(like=> like.username === user.username)){
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    },[user,likes]);

    const likeButton = user ? (
            isLiked ? (
                <Button color='teal' >
                    <Icon name='heart' />
                </Button>
            ) : (
                <Button color='teal' basic>
                    <Icon name='heart' />
                </Button>
            ) 
        ) : (
            <Button as={Link} to="/login" color='teal' basic>
                <Icon name='heart' />
            </Button>
        )

    if(user){
        return (
            <Button as='div' labelPosition='right' onClick={()=> likePost()}>
                { likeButton }
                <Label as='a' basic color='teal' pointing='left' >
                    {likeCount}
                </Label>
            </Button>
        )
    } else {
        return (
            <Button as='div' labelPosition='right' onClick={logout}>
                { likeButton }
                <Label as='a' basic color='teal' pointing='left' >
                    {likeCount}
                </Label>
            </Button>
        )

    }
}

export default LikeButton
