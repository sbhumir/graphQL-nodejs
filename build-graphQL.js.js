var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

//define GraphQL schema
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

var getWord = async function (args) {
    var id = args.id;
    return await wordsData.filter(word => {
        console.log('after id', id);
        return word.id == id;
    });
}


var getWords = async function (args) {
    if (args.origin) {
        var origin = args.origin;
        console.log('after origin', args.origin);
        return await wordsData.filter(word => word.origin === origin);

    } else {
        return wordsData;
    }
}
var updateDictionary = function ({ id, dictionary }) {
    wordsData.map(word => {
        if (word.id == id) {
            word.dictionary = dictionary;
            return word;
        }
    });
    console.log(wordsData.filter(word => word.id == id))
    return wordsData.filter(word => word.id == id)
}
var root = {
    word: getWord,
    words: getWords,
    updateDictionary: updateDictionary

};

//Create an express server and a GraphQL endpoint
var app = express(); //instance of an express server

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(5000, () => console.log('Express graphql - browse to - localhost:5000/graphql'));