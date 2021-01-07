const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose =  require('mongoose');

const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('connected!')
})


app.use(cors()); // using cors because frontend is hosted on a separate channel
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema //or just schema
}));

module.exports = app;