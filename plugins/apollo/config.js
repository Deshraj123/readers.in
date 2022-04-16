import { ApolloLink } from "apollo-link"
import { onError } from "apollo-link-error"
import { createHttpLink } from "apollo-link-http"
import { persistCache } from 'apollo-cache-persist'
import introspectionResult from "~/graphql/graphql.schema.json"
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult,
})

const cache = new InMemoryCache({
  fragmentMatcher,
})

cache.originalReadQuery = cache.readQuery
cache.readQuery = (...args) => {
  try {
    return cache.originalReadQuery(...args)
  } catch (err) {
    return undefined
  }
}
if (process.browser) {
  persistCache({
    cache,
    storage: window.localStorage,
    trigger: 'write',
    debug: true
  })
}

// eslint-disable-next-line new-cap
const httpLink = new createHttpLink({
  uri: process.env.endpoint_url,

  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
})

const errorLink = onError(({ response, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    //console.log("graphQLErrors")
    //console.log(graphQLErrors)

    //console.log("response")
    //console.log(response)

    for (const graphQLError of graphQLErrors) {
      if (graphQLError.message) {
        //console.log(graphQLError.message)
      } else {
        //console.log(graphQLError.debugMessage)
      }
    }
  }
  if (networkError) {
    //console.log(`[Network error]: ${networkError}`)
  }
})

const link = ApolloLink.from([errorLink, httpLink])

export default () => ({
  // eslint-disable-next-line new-cap
  link,
  cache,
  defaultHttpLink: false,
  connectToDevTools: false,
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
})
