import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    from,
    ApolloProvider as AplProvider
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";


const ApolloProvider = ({children}) => {
    // connection to the backend server
    const httpLink = new HttpLink({
        uri: "http://localhost:4000/"
    });

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


    // apollo client init
    const client = new ApolloClient({
        link:from([errorLink,httpLink]),
        cache: new InMemoryCache(),
    });

    return(
        <AplProvider client={client}>
            { children }
        </AplProvider>
    )
};

export default ApolloProvider;