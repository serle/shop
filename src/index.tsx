import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ProductList from "./components/ProductList";


//const server:string = process.env.NODE_ENV === 'development' ? 'localhost' : 'server'
//console.log(`server: ${server}`);

const client = new ApolloClient({
    uri: `http://localhost:3001/graphql`,
    cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <ProductList/>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

