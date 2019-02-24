/*
--------------------------------------------------------
Generic Promise Based migration script via axios requests
Author: Omar Gaber El-Sayed
--------------------------------------------------------
*/
const axios = require("axios");

/**
 * Declaration of variables that will store data to be migrated and tokens retreived
 * from source and destination servers. We'll consider for now that we have the destination
 * token and will hardcode it below.
 *
 *
 * If we do not have the token, we' will just replicate the same axios request
 * on line beneath the comment 'AXIOS AUTH TOKEN' again at the area where the comment
 * 'AXIOS AUTH REPLICATION' is mentioned.
 */

var dataAcquired;
var sourceAuthToken;
var destinationAuthToken = "ENTER DESTINATION AUTHORIZATION TOKEN HERE";

/**
 * Credentials that are authorized to access the source and destination servers
 * are stoed in json objects because they will be included in the requests for tokens.
 */

var sourceCredentials = {
  username: "ENTER USERNAME HERE",
  password: "ENTER PASSWORD HERE"
};

/* The destination script is not needed here currently, since we presumed we have the authorization token.

var destinationCredentials = {
  username: "ENTER USERNAME HERE",
  password: "ENTER PASSWORD HERE"
};

*/

/**
 * First request is by obtaining the token from source server.
 *
 *
 * Take into consideration that the response token from your server might not be stored the same attribute.
 * In this case the access token is stored in an attribute called "access_token".
 */

// 'AXIOS AUTH TOKEN'
axios
  .post(
    "ENTER LINK SPECIFIED FOR GRANTING ACCESS TOKEN HERE",
    sourceCredentials
  )
  .then(outcome => {
    sourceAuthToken = outcome.data["access_token"];
    /**
     * You'll use the retreived token to get access to the data from the source server API endpoint.
     * You should know the structure of the retreived data from the GET request and the attribute its stored in.
     * In this case, the data is stored in an attribute called "users".
     */
    axios
      .get("ENTER SOURCE SERVER API ENDPOINT PATH HERE", {
        headers: { Authorization: `${sourceAuthToken}` }
      })
      .then(dataFromServer => {
        dataAcquired = dataFromServer.data.users;
        // You are going to loop over the data acquired and retreive from it the
        // attributes you need to migrate to the destination server.
        // In this case, we will migrate user's first name, last name, date of birth and mobile number.
        var i;
        var dataToMigrate = [];
        for (i = 0; i < dataAcquired.length; i++) {
          var userParameters = {};

          /**
           * Inside this loop, we create an object called 'userParameters' which will include
           * all the parameters we need to migrate to the destination server using the
           * attribute naming specified or declared in the database model. The object is
           * then pushed to an array called 'dataToMigrate' which will include all the
           * data needed to be migrated
           *
           * Sometimes you need to filter out some attributes. or take in some
           * records and leaving out the rest. This is where you add these filters.
           */

          userParameters.first_name = dataAcquired[i]["first_name"];
          userParameters.last_name = dataAcquired[i]["last_name"];
          userParameters.date_of_birth = dataAcquired[i]["date_of_birth"];
          userParameters.number = dataAcquired[i]["number"];
          dataToMigrate.push(userParameters);
        }
        var j;
        for (j = 0; j < dataToMigrate.length; j++) {
          let theObject = dataToMigrate[j];
          /**
           * 'AXIOS AUTH REPLICATION' (if not already hardoded above. Store it in 'destinationAuthToken')
           * Bear in mind that you might need to use different headers than the one's specified below. Depending
           * on your destination api endpoint specifications.
           */
          axios
            .post(
              "ENTER DESTINATION API ENDPOINT PATH HERE",
              dataToMigrate[j],
              {
                headers: {
                  Authorization: `${destinationAuthToken}`,
                  "Content-Type": "application/json"
                }
              }
            )
            .then(destinationResponse => {
              console.log("THE OBJECT ADDED");
              console.log(theObject);
              console.log("--------------");
            })
            .catch(err => {
              console.log(err.message);
            });
        }
        console.log("Migration Completed!");
      })
      .catch(err => {
        console.log(err.message);
      });
  })
  .catch(err => {
    console.log(err.message);
  });
