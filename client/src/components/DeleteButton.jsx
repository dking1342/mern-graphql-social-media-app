import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'
import CONSTANTS from '../gql/constants'
import graphqlMutations from '../gql/mutations'
import graphqlQueries from '../gql/query'

const DeleteButton = ({postId,callback}) => {
    const [confirmOpen, setConfirmOpen]=useState(false);
    const [removeButton] = useMutation(graphqlMutations(CONSTANTS.DELETE_POST),{
        update(proxy){
            setConfirmOpen(false);

            let data = proxy.readQuery({
                query:graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY)
            });
            let filteredPosts = data.getPosts.filter(post => post.id !== postId);
            proxy.writeQuery({
                query:graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY),
                data:{
                    ...data,
                    getPosts:filteredPosts
                }
            })
            if(callback) callback();            
        },
        variables:{
            postId
        },
    })


    return (
        <>
            <Button as='div' color='red' floated='right' onClick={()=>setConfirmOpen(true)}>
                <Icon name='trash' style={{margin:0}} />
            </Button>
            <Confirm
                header="Delete Post"
                open={confirmOpen}
                onCancel={()=>setConfirmOpen(false)}
                onConfirm={removeButton}

            />
        </>
    )
}

export default DeleteButton