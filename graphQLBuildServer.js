//import express, functions graphqlHTTP, buildSchema
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

//define GraphQL schema to access data. Store schema in schema variable
//define two queries and a Mutation with parameters and what they return
var schema = buildSchema(`
    type Query {
        word(id: Int!): Word
        words(origin: String): [Word]
    }
    type Mutation{
        updateDictionary(id: Int!, dictionary: String!): Word
    }
    type Word{
        id: Int
        origin: String
        partofspeech: String
        description: String
        dictionary: String
        url: String
    }
`);

//define wordsData array
var wordsData = [
    {
        id: 1,
        origin: 'Latin',
        partofspeech: 'noun',
        description: 'Fetch a noun from origin Latin',
        dictionary: 'Merriam Webster',
        url: 'https://dictionaryapi.com/api/v3/references/collegiate/json/'
    },
    {
        id: 2,
        origin: 'Greek',
        partofspeech: 'adjective',
        description: 'Fetch an adjective from origin Greek',
        dictionary: 'Merriam Webster',
        url: 'https://dictionaryapi.com/api/v3/references/collegiate/json/'
    },
    {
        id: 3,
        origin: 'Greek',
        partofspeech: 'verb',
        description: 'Fetch a verb from origin Greek from Medical Dictionary',
        dictionary: 'Medical',
        url: 'https://dictionaryapi.com/api/v3/references/medical/json'
    },
]

var getWord = args => {
    //assign args id to a var
    var id = args.id;
    //look for this id in wordsData array
    return wordsData.filter(word => {
        return word.id == id;
    })[0];
}


var getWords = args =>  {
    //check if word origin is passed over
    if (args.origin) {
        var origin = args.origin; //assign passed origin to a var
        return wordsData.filter(word => word.origin === origin); //return word record if there is a match
    } else return wordsData; //if origin is not passed in query then return the whole array        
}
//build update API to update word dictionary value
var putDictionary = ({ id, dictionary }) => {

    wordsData.map(word => {
        if (word.id == id) {
            word.dictionary = dictionary;
            return word;
        }
    });
    //this Mutation method should return the updated ID as well for the users to check
    return wordsData.filter(word => word.id === id)[0];
}

//assign functions to queries
var root = {
    word: getWord,
    words: getWords,
    updateDictionary: putDictionary
};

//Create an express server and a GraphQL endpoint
var app = express(); //instance of an express server

// add endpoint and middleware express-graphql
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(5000, () => console.log('Express graphql - browse to - localhost:5000/graphql'));