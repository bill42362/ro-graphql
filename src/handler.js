// handler.js
'use strict';
import 'babel-polyfill';
import { graphqlLambda } from 'apollo-server-lambda';
import lambdaPlayground from 'graphql-playground-middleware-lambda';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema.js';
import { rootValue } from './rootValue.js';

const resolverQuery = Object.keys(rootValue).reduce((current, key) => {
    const assignObject = {};
    assignObject[key] = (root, args) => { return rootValue[key](args); };
    return Object.assign({}, current, assignObject);
}, {});

const myGraphQLSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: {Query: resolverQuery},
    logger: console,
});

export const graphqlHandler = (event, context, callback) => {
    const callbackFilter = (error, output) => {
        // eslint-disable-next-line no-param-reassign
        output.headers['Access-Control-Allow-Origin'] = '*';
        callback(error, output);
    };
    const handler = graphqlLambda({schema: myGraphQLSchema, tracing: true});
    return handler(event, context, callbackFilter);
};

export const playgroundHandler = lambdaPlayground({endpoint: '/dev/graphql'});

export default { graphqlHandler, playgroundHandler };
