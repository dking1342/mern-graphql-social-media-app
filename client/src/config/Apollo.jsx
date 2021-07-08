import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
    ApolloProvider as AplProvider
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  import { setContext } from 'apollo-link-context';


const ApolloProvider = ({children}) => {
    // connection to the backend server
    const httpLink = new HttpLink({
        uri: "http://localhost:4000/"
    });

    const authLink = setContext(()=>{
        let user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
        const token = user ? user.token : null;
        return {
            headers:{
                Authorization: token ? `Bearer ${token}` : ''
            }
        }
    })

    // error handling for apollo
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
            );

        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    let cache = new InMemoryCache({
        typePolicies:{
            Post:{
                keyFields:["id"]
            }
        }
    })

    // apollo client init
    const client = new ApolloClient({
        link:from([errorLink,authLink.concat(httpLink)]),
        cache,
    });

    return(
        <AplProvider client={client}>
            { children }
        </AplProvider>
    )
};

export default ApolloProvider;