import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from '@apollo/client';
import { NextPage } from 'next';

const ApolloProv: NextPage = ({ children }) => {
  const link = from([
    new HttpLink({ uri: `${process.env.NEXT_PUBLIC_PORT}api/graphql` }),
  ]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloProv;
