






// const allMovies = JSON.parse(fs.readFileSync('./moviedata.json', 'utf-8'));



// allMovies.forEach(function(movie) {
//     const params = {
//         TableName: 'Movies',
//         Item: {
//             'year': movie.year,
//             'title': movie.title,
//             'info': movie.info,
//         }
//     };

//     docClient.put(params, function(err, data) {
//         if (err) {
//             console.log('Error: ', err);
//             return;
//         }
//         console.log('Data: ', data);
//     });
// });





// const dynamodb = new AWS.DynamoDB();

// const params = {
//     TableName : "Movies",
//     KeySchema: [       
//         { AttributeName: "year", KeyType: "HASH"},  //Partition key
//         { AttributeName: "title", KeyType: "RANGE" }  //Sort key
//     ],
//     AttributeDefinitions: [       
//         { AttributeName: "year", AttributeType: "N" },
//         { AttributeName: "title", AttributeType: "S" }
//     ],
//     ProvisionedThroughput: {       
//         ReadCapacityUnits: 10, 
//         WriteCapacityUnits: 10
//     }
// };


// dynamodb.createTable(params, function(err, data) {
//     if (err) {
//         console.log('Error: ', err);
//         return
//     }

//     console.log('Created Table. Table description JSON: ', JSON.stringify(data, null, 2));
// });












/************** Query by Title  ************/
// var docClient = new AWS.DynamoDB.DocumentClient();

// console.log("Querying for movies from 1992 - titles A-L, with genres and lead actor");

// var params = {
//     TableName : "Movies",
//     ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
//     KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
//     ExpressionAttributeNames:{
//         "#yr": "year"
//     },
//     ExpressionAttributeValues: {
//         ":yyyy": 1992,
//         ":letter1": "A",
//         ":letter2": "L"
//     }
// };

// docClient.query(params, function(err, data) {
//     if (err) {
//         console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Query succeeded.");
//         data.Items.forEach(function(item) {
//             console.log(" -", item.year + ": " + item.title
//             + " ... " + item.info.genres
//             + " ... " + item.info.actors[0]);
//         });
//     }
// });