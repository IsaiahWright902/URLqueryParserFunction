/* I originally was given this challenge for an interview and wrote it in vanilla javascript.
   I ended up extending its functionality in TypeScript and I thought it was pretty cool.
   This function takes in a url and parses all of the parameters converting it into an object. 
   It dynamically knows if something has already been added to the object and prevents duplicates.
   Examples below:
*/

function parseUrl(url: string) {
  let parsedUrl = url.split("?");
  let queryString = parsedUrl[1];
  let queryValues = queryString.split("&");
  let returnObject: any = {};
  for (let i = 0; i < queryValues.length; i++) {
    let values = queryValues[i].split("=");
    if (values[0] in returnObject) {
      if (Array.isArray(returnObject[values[0]])) {
        if (returnObject[values[0]].includes(values[1])) {
          console.log("Duplicate Found!");
        } else {
          returnObject[values[0]].push(values[1]);
        }
      } else {
        returnObject[values[0]] = [returnObject[values[0]], values[1]];
      }
    } else {
      returnObject[values[0]] = values[1];
    }
  }
  return returnObject;
}

// Single Parameters:
parseUrl("https//www.example.com/widgets?color=blue&sort=newest");
/* Output:
{
    color: 'blue',
    sort: 'newest'
}
*/

// Multiple Parameters
parseUrl(
  "https//www.example.com/widgets?color=blue&color=red&sort=newest&category=movies&color=purple&color=red"
);
/* Output:
{
    category: "movies",
    color: ['blue', 'red', 'purple'],
    sort: "newest"
}
*/

// Breakdown of whats happening
function parseUrlBreakdown(url: string) {
  let parsedUrl = url.split("?"); // Takes in the url string and splits it where the query parameters begin giving us an an array of the base url and parameters.
  let queryString = parsedUrl[1]; // We then take just the query string out of the array and set it to a variable.
  let queryValues = queryString.split("&"); // We now spit that string to pull out the parameters giving us an array of strings like this: "color=blue".
  let returnObject: any = {}; // Initializes return object
  for (let i = 0; i < queryValues.length; i++) {
    // Begin iterating through the array of queryValues
    let values = queryValues[i].split("="); // We then split the individual query parameters: "color=blue" = ['color', 'blue']
    if (values[0] in returnObject) {
      // Check to see if the current key is already in the object.
      if (Array.isArray(returnObject[values[0]])) {
        // If the key is in the object we check if its an array or not in case there are multiple values in that key
        if (returnObject[values[0]].includes(values[1])) {
          //If the current key is already an array we than check if the value is a duplicate
          console.log("Duplicate Found!");
          continue;
        } else {
          returnObject[values[0]].push(values[1]); // If the the value does not exist in the array push the new value
        }
      } else {
        returnObject[values[0]] = [returnObject[values[0]], values[1]]; // If there is a key match, create an array to hold all the data under one key
      }
    } else {
      returnObject[values[0]] = values[1]; // Set the key and value in return object.
    }
  }
  return returnObject; // Return your nicely formatted query object :)
}
