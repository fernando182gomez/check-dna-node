# Check DNA Mutation

This is a project where you can send a DNA array to the api and it will respond if the sequence has or not mutation, the string in each position should contain only these characters `A,T,C,G` which represents each nitrogenous base of DNA.

You will know if there is a mutation if more than one four-letter sequence is found.equal, obliquely (diagonal), horizontal or vertical.

- Clone this project in your prefered folder
- Execute `npm install` to get all the required dependencies
- If you are running locally be sure to modify index.js and change `herokuMysql` to `localMysql`
- Also be sure to create the database and table that is in `database/script.sql`, the database should be MySQL,
- If you want to test it using heroku connection you just need to do the step 1 and 2
- Finally for both approaches run `node index.js`, and will be ready in `http://localhost:3000`

### Examples:
**No mutation**
```
A T G C G A
C A G T G C
T T A T T T
A G A C G G
G C G T C A
T C A C T G
```

**With mutation**
```
A T G C G A
C A G T G C
T T A T G T
A G A A G G
C C C C T A
T C A C T G
```

This API is mounted in `Heroku` and is using a `MySQL` database to store the results of each request.
The URL of the API is the following:

https://check-dna-mutation.herokuapp.com/

If you go to this URL you will be able to see a welcome message for the API
```
{"message":"Welcome to ADN Mutation API"}
```

I created two API services with the following structure:

### Mutation Service
This is the service to send a DNA sequence and retrive if has or not mutation, also store in the database the result of this operation in order to calculate the statsistics in the other service.

URL: https://check-dna-mutation.herokuapp.com/mutation
type: POST
Request example:
```
{
    "dna":["ATGCGA","CTGTGC","TTATGT","AGGAGG","CCTCTA","TCACTG"]
}
```

Response example:
```
{
    "code": 403,
    "message": "This sequence has not mutation",
    "data": {
        "id": "ATGCGACTGTGCTTATGTAGGAGGCCTCTATCACTG",
        "dna": [
            "ATGCGA",
            "CTGTGC",
            "TTATGT",
            "AGGAGG",
            "CCTCTA",
            "TCACTG"
        ],
        "sequences": [
            "GGGGTT"
        ],
        "numberOfSequences": 1,
        "hasMutation": false
    }
}
```
This service returns 403 code if the sequence has no mutation and code 200 if sequence has mutation, also you can se the property `hasMutation` who indicate the same approach. 

Also you can see in the `sequences` array the strings that matches with the validations.

### Stats Service

This service get from database how many items has or not mutation and also calculate the ratio between these items.

URL: https://check-dna-mutation.herokuapp.com/stats
Type: GET

Response example:
```
{"count_mutations":40,"count_no_mutations":100,"ratio":0.4}
```

Also this project count with unit testing using `mocha`, you only need to run `npm test`
[![test-node-app.png](https://i.postimg.cc/wBnPp5mn/test-node-app.png)](https://postimg.cc/CZHJCqJ4)
As you see all the test cases are running correctly.

Finally I used `nyc` and added the following scripts in package.json in order to check the testing coverage in the app:
```
"scripts": {
    "start": "node .", // To start the application
    "test": "mocha --reporter spec", // To run test cases
    "test:coverage": "nyc --reporter=text mocha" // To check testing coverage
  }
 ```
 
 Running the `npm run test:coverage you will see in the console the following:
 [![nyc-test-coverage.png](https://i.postimg.cc/3Rv2smXS/nyc-test-coverage.png)](https://postimg.cc/xJ9kHkFM)