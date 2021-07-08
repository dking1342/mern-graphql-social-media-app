import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import { AuthContext } from '../context/auth'
import CONSTANTS from '../gql/constants'
import graphqlQueries from '../gql/query';
import PostForm from '../components/PostForm';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { loading, error, data } = useQuery(graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY));

    if(loading) return <p>loading...</p>
    return (
        <Grid columns='3' stackable doubling>
            <Grid.Row centered>
                <h1 style={{marginBottom:'1rem'}}>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                    )
                }
                {
                    loading ? (
                        <h1>loading...</h1>
                    ) : error ? (
                        <h1>Error when loading the posts</h1>
                    ) : (
                        <Transition.Group>
                            {
                                data && data.getPosts.map(post => (
                                    <Grid.Column key={post.id} style={{marginBottom:'20px'}} >
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

export default Home
