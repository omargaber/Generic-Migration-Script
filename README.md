# Generic Promis Based Migration Script using Axios Requests

Using basic axios GET and POST requests, you can use this script to migrate data from a
source server to a destination server through the dedicated API endpoints.

## Instructions for Installation

In your terminal, you need to enter the following command to install all dependencies:

`npm install`

## Instructions for Configuration and Running

- To be able to use this script and utilize it to its full potential, you need to go through the comments and add data like:

  - Credentials for authorization token
  - API **source** endpoint for both authorization token and data.
  - API **destination** endpoint for data to be posted.

- After going through all the comments and replacing the placeholder with the right API paths, credentials etc., you need to run the following command to be able to start running the script.

`node MigrationScript.js`
