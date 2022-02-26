import { ApolloClient, InMemoryCache, ApolloProvider  } from "@apollo/client"; 
import { NextPage } from "next";

const ApolloProv: NextPage = ({children}) => {
  /*   const errorLink: ApolloLink = onError(
        
        (graphqlErrors: GraphQLError[], networkError: NetworkError) => {

        if(graphqlErrors){
            graphqlErrors.map((err: GraphQLError)=>(
                alert(`GraphQl err : ${err.message}`)
                
            ))
        }

    })
    const link = from([
        errorLink,
        new HttpLink({ uri : `${process.env.NEXT_PUBLIC_PORT}/api/graphql`})
    ]) */

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri : `${process.env.NEXT_PUBLIC_PORT}api/graphql`
    })
    console.log(`${process.env.NEXT_PUBLIC_PORT}/api/graphql`)
       return ( 
        <ApolloProvider client={client}>
            {children} 
        </ApolloProvider> 
     );
}
 
export default ApolloProv;