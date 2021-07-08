import { useMutation } from '@apollo/client';
import React, {  } from 'react';
import { Button, Form } from 'semantic-ui-react';
import CONSTANTS from '../gql/constants';
import graphqlMutations from '../gql/mutations';
import graphqlQueries from '../gql/query';
import { useForm } from '../hooks/customHooks';

const PostForm = () => {
    // const [error,setError]=useState({});
    const { values, onSubmit, onChange } = useForm(createPostCallback,{
        body:''
    });

    let [createPost,{ error }] = useMutation(graphqlMutations(CONSTANTS.CREATE_POST),{
        update(proxy,result){
            const data = proxy.readQuery({
                query: graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY)
            });
            let newData = [...data.getPosts];
            newData = [result.data.createPost, ...newData];
            proxy.writeQuery({
                query: graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY),
                data:{
                    ...data,
                    newData
                }
            });
            values.body = '';
        },
        variables:values
    });

    function createPostCallback(){
        createPost();
    }

    if(Boolean(values.body.length)){
        // setError({});
        console.log('body',values.body)
        console.log(error)
        error = null;
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
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
                    <Button type='submit' color='teal'>
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {
                error && (
                    <div className="ui error message">
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
