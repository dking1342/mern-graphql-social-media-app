import { useMutation } from '@apollo/client';
import React, {  } from 'react';
import { Button, Form } from 'semantic-ui-react';
import CONSTANTS from '../gql/constants';
import graphqlMutations from '../gql/mutations';
import graphqlQueries from '../gql/query';
import { useForm } from '../hooks/customHooks';

const PostForm = () => {
    const { values, onSubmit, onChange } = useForm(createPostCallback,{
        body:''
    });

    let [createPost,{ error }] = useMutation(graphqlMutations(CONSTANTS.CREATE_POST),{
        update(proxy,result){
            let { createPost } = result.data;
            let data = proxy.readQuery({
                query:graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY)
            });
            let newPosts = [createPost, ...data.getPosts];
            proxy.writeQuery({
                query:graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY),
                data:{
                    ...data,
                    getPosts:newPosts
                }
            })
            values.body = '';
        },
        variables:values,
        
    });

    function createPostCallback(){
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit} style={{width:'100%',padding:'0 1rem'}}>
                <h2>Create a post: </h2>
                <Form.Field>
                    <Form.Input 
                        placeholder='Hi World'
                        name='body'
                        required
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type='submit' color='teal' disabled={values.body.trim() === ''} >
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {
                error && (
                    <div className="ui error message" style={{marginBottom:20}}>
                        <ul className="list">
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default PostForm
