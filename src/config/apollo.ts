import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
	uri:
		"https://api-eu-central-1.graphcms.com/v2/cklj2e27ugicq01yydjxa3t46/master",
	cache: new InMemoryCache(),
});
