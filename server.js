const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const jsonToSchema = require('@walmartlabs/json-to-simple-graphql-schema');
const fs = require('fs');
const fastXmlParser = require('fast-xml-parser');
const {
    buildSchema,
} = require('graphql');

const app = express();
const filename = 'simple-workbook.twb';

const initialState = {
  time: Date.now(),
  memory: process.memoryUsage().heapUsed,
  fileSize: getFilesizeInMB(filename)
}

const twbXML = readFile(filename);
const parsedJson = parseJson(twbXML);
const schema = deriveSchema(parsedJson);

startServer();

function readFile(filename) {
  const file = fs.readFileSync(`${__dirname}/${filename}`, 'utf8');
  console.log('file read');
  return file;
}

function getFilesizeInMB(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes / 1024 / 1024;
}

function parseJson() {
  const parsedJson = fastXmlParser.parse(JSON.stringify(twbXML));
  fs.writeFileSync(__dirname + '/output/parsed.json', JSON.stringify(parsedJson));
  console.log('json parsed');
  return parsedJson;
}

function deriveSchema(parsedJson) {
  const schema = jsonToSchema.jsonToSchema({ jsonInput: JSON.stringify(parsedJson) }); // duplicate parsing
  
  const schemaWithQuery = `
    ${schema.value} 
    type Query {
      workbook: Workbook
  }`;

  fs.writeFileSync(__dirname + '/output/schema.txt', JSON.stringify(schemaWithQuery));
  console.log('schema derived from JSON');
  return schemaWithQuery;
}

function printMetrics() {
  console.log((Date.now() - initialState.time) / 1000 + 's');
  console.log((process.memoryUsage().heapUsed - initialState.memory) / 1024 /1024 + 'MB');
}

function startServer() {
  app.use('/graphql', expressGraphQL({
    schema: buildSchema(schema),
    rootValue: parsedJson,
    graphiql: true,
  }));
  
  printMetrics();
  
  console.log('=========\n\n\n\n');
  app.listen(5000, () => console.log('server running'));
}