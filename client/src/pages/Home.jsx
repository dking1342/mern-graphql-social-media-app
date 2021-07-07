import { useQuery } from '@apollo/client'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import CONSTANTS from '../gql/constants'
import graphqlQueries from '../gql/query'

const Home = () => {
    const { loading, error, data } = useQuery(graphqlQueries(CONSTANTS.FETCH_POSTS_QUERY));

    if(loading) return <p>loading...</p>
    if(error) throw new Error(error)
    return (
        <Grid columns='3' stackable doubling>
            <Grid.Row centered>
                <h1 style={{marginBottom:'1rem'}}>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (
                        <h1>loading...</h1>
                    ) : error ? (
                        <h1>Error when loading the posts</h1>
                    ) : (
                        data && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{marginBottom:'20px'}} >
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    )
}

export default Home
