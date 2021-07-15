




//// Set up a Simple express server. 
const express = require('express');

//// const expressGraphQL = require('express-graphql'); had to use .graphqlHTTP to use expressGraphQL.
const expressGraphQL = require('express-graphql').graphqlHTTP;


//// The meat of the backend for this app. Where all the query responses and mutations are. 
const schema = require('./schema.js');


const app = express();


/// Route to graphql, include schema and graphiql ui.
app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true /* allows you to use the graphql ui to preform tests */
}));


app.listen(4000, ()=> {
    console.log('Server is running on port 4000...')
});