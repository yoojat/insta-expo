import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import {
  getMainDefinition,
  offsetLimitPagination,
} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

const TOKEN = 'token';

export const logUserIn = async (token) => {
  // await AsyncStorage.multiSet([
  //   ['token', token],
  //   ['loggedIn', 'yes'],
  // ]);
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};
const uploadHttpLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  // uri: 'https://great-fireant-2.loca.lt/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    // reconnect: true,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log('Network Error', networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // seeFeed: {
        //   keyArgs: false,
        //   merge(existing = [], incoming = []) {
        //     return [...existing, ...incoming];
        //   },
        // },å
        seeFeed: offsetLimitPagination(),
      },
    },
  },
});

// const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);
const httpLinks = ApolloLink.from([authLink, onErrorLink, uploadHttpLink]);
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  // link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  // link: ApolloLink.from([authLink, onErrorLink, uploadHttpLink]),
  // link: httpLinks,
  link: splitLink,

  cache,

  // uri: ' https://sharp-eel-61.loca.lt/graphql',
  // ./grok http 4000
  // npx localtunnel --port 4000
});

export default client;
