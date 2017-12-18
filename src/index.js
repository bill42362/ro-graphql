// index.js
import express from 'express';
import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';
import { schema } from './schema.js';
import { rootValue } from './rootValue.js';

const EXPRESS_PORT = 3000;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(schema),
    rootValue,
    graphiql: true,
}));

app.listen(EXPRESS_PORT, () => {
    console.log(`Listening ${EXPRESS_PORT} ...`);
});
