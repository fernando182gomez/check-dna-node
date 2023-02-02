const express = require("express");
const bodyParser = require('body-parser');
const { validateDNA } = require("./services/validations");
const { hasMutation } = require("./services/mutant-check");

//create mysql connection
const mysql = require('mysql');
const { insertDNA, getStats } = require("./database/query");

const herokuMysql = {
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'bc6f6ebf14b349',
  password: '58c88ec3',
  database: 'heroku_f2c035c90bb0496'
};

const localMysql = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dna'
}

const connection = mysql.createConnection(herokuMysql);

const app = express();

// Define the port
const port = process.env.PORT || 3000;

// Run the application
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

// Welcome message to the Mutation API
app.get("/", (_, response) => {
  response.json({ message: "Welcome to ADN Mutation API" });
});

// Service to check if a dna sequence has a mutation
app.post("/mutation", (request, response) => {
  const requestBody = request.body;

  // Validate request to check if has valid strucure
  const objValidation = validateDNA(requestBody);

  if (objValidation.code !== 200) {
    response.json(objValidation);
    return;
  }

  // Check if the dna sequence has mutation
  const mutation = hasMutation(requestBody);
  const { data } = mutation;

  // Store in database
  insertDNA(connection, data);

  response.json(mutation);
});

// Service to check how many items have the registered DNA's 
app.get("/stats", (_, response) => {
  getStats(connection).then(data => {
    response.json(data);
  });
});