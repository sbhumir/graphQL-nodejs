# graphQL-nodejs
A simple node.js application that builds and uses queries and mutations using GraphQL

## Installation
Install the following packages
```bash
$ npm install graphql express express-graphql --save
```
## Usage
Run js file
```python
$ node graphQLBuildServer.js
```
1. Run graphql queries from any IDE like Postman or browse to graphql - http://localhost:<PORT_NUMBER>/graphql  (ex: http://localhost:5000/graphql ) 
2. Enter below GraphiQL, Query Variables and execute query to get all the records by a specific origin

## graphiQL -- GET data by origin
```python
query getWordsOrigin($wordOrigin: String!){
  words(origin: $wordOrigin){
    origin
    partofspeech
    description
    dictionary
    url
  }
}
```
## Query Variables
```python
{
  "wordOrigin": "Greek"
}
```
Response: All the words by origin 'Greek' returned

## Fragments query ex - get records 1 and 2
GraphiQL:
```python
query getWordsFragment($wordID1: Int!, $wordID2: Int!){  
  word1: word(id: $wordID1){
    ...wordDetails    
  }  
  word2: word(id: $wordID2){
    ...wordDetails
  }
}
fragment wordDetails on Word {
  origin
  partofspeech
  description
  dictionary
  url
}
```
Query Variables
```python
{
  "wordID1": 1,
  "wordID2": 2
}
```
## Mutation ex: update a record
GraphiQL:
```python
mutation updateDictionary($id: Int!, $dictionary: String!){
  updateDictionary(id: $id, dictionary: $dictionary){
    ...wordDetails
  }
}
fragment wordDetails on Word {
  origin
  partofspeech
  description
  dictionary
  url
}
```
Query Variables:
```python
{
  "id": 1,
  "dictionary": "Collegiate"
}
```
Response: A record is updated by dictionay value and returns id as well
