const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const twb = require('./simple-twb');
const TwbType = require('./simple-schema');

const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');

const app = express();

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        twb: {
            type: TwbType,
            description: 'Entire workbook',
            resolve: () => twb
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(5000, () => console.log('server running'));